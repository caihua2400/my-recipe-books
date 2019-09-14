import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import {BehaviorSubject, Subject, throwError} from 'rxjs';
import {User} from './user.model';
import {Router} from '@angular/router';


export interface AuthResponseData{
  kind: string;
  idToken: string;
  email:string;
  refreshToken: string;
  expiresIn:string;
  localId:string;
  registered?: boolean
}

@Injectable()
export class AuthService{

 user=new BehaviorSubject<User>(null);
 private TokenExpirationTimer:any;



  constructor(private http : HttpClient,private router : Router){

  }
  signUp(email: string, password : string){
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBqDMym2-_iY3JpRb8OaWB11Kiipk9RuW8',{
      email:email,
      password:password,
      returnSecureToken : true
    }).pipe(catchError(this.handleError),tap(resData=>{
         this.handleAuthtication(resData.email,resData.localId,resData.idToken,+resData.expiresIn)

    }));
  }
  autoLogin(){

    const userData :{
      email:string,
      Id:string,
      _token:string,
      _tokenExpirationDate:string
    }= JSON.parse(localStorage.getItem('userData'));


    if(!userData){
      return ;
    }
    const loadedUser=new User(userData.email,userData.Id,userData._token,new Date(userData._tokenExpirationDate));


    if(loadedUser.token){

      this.user.next(loadedUser);
      const expirationDuration =
        new Date(userData._tokenExpirationDate).getTime() -
        new Date().getTime();
      this.autoLogOut(expirationDuration);

    }
  }

  private handleAuthtication(email : string, userId : string,token : string, expiresIn : number){
    const expirationDate=new Date(new Date().getTime()+ expiresIn * 1000);
    const user=new User(email,userId,token,expirationDate);
    this.user.next(user);

    localStorage.setItem('userData',JSON.stringify(user));
    this.autoLogOut(expiresIn*1000);
  }

  logIn(email : string, password : string){
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBqDMym2-_iY3JpRb8OaWB11Kiipk9RuW8',{
      email,
      password,
      returnSecureToken : true
    }).pipe(catchError(this.handleError),tap(resData=>{
      this.handleAuthtication(resData.email,resData.localId,resData.idToken,+resData.expiresIn)

    }));
  }
  logOut(){
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if(this.TokenExpirationTimer){
             clearTimeout(this.TokenExpirationTimer);
    }
    this.TokenExpirationTimer=null;
  }

  autoLogOut(expirationDuration : number){
    this.TokenExpirationTimer=   setTimeout(()=>{
       this.logOut();
     },expirationDuration);
  }
  private handleError(error : HttpErrorResponse){

      let errorMessage='an unknown error happens';
      if( !error.error ||  ! error.error.error){
          return throwError(errorMessage);
      }
      switch (error.error.error.message) {
        case 'EMAIL_EXISTS':
            errorMessage='this email already exists';
            break;
        case 'EMAIL_NOT_FOUND':
             errorMessage='the email does not exist';
             break;
        case 'INVALID_PASSWORD':
          errorMessage='The password is invalid or the user does not have a password';
          break;


      }
      return throwError(error +errorMessage);

  }
}
