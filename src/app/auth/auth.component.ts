import {Component} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthResponseData, AuthService} from './auth.service';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl:'./auth.component.html'

})
export class AuthComponent{
   isLoggingMode=true;
   isLoading=false;
   error=null;

   OnSwitchMode(){
     this.isLoggingMode=!this.isLoggingMode;
   }

   constructor(private authService : AuthService,private router : Router){

   }

  OnSubmit(authForm: NgForm) {
     if(!authForm.valid){
       return;
     }
    const email = authForm.value.email;
    const password=authForm.value.password;

    this.isLoading=true;
    let authObs: Observable<AuthResponseData>;
    if(this.isLoggingMode){
      //
     authObs=   this.authService.logIn(email,password);
    }else{
      authObs=  this.authService.signUp(email,password);
    }
    authObs.subscribe(responseData=>{
      console.log(responseData);
      this.isLoading=false;
      this.router.navigate(['/recipes']);
    },error=>{
      console.log(error);
      this.error= error;
      //this.showErrorAlert();
      this.isLoading=false;
    });
    authForm.reset();
  }

  OnCloseErrorAlert() {
    this.error=null;
  }


}
