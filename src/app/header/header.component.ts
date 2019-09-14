import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {DataStorageService} from '../shared/data-storage.service';
import {RecipeService} from '../recipes/recipe.service';
import {AuthService} from '../auth/auth.service';
import {Subscription} from 'rxjs';
import {User} from '../auth/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthticated=false;

  authSubscribe: Subscription;
  constructor(private datastorageService : DataStorageService,private authService : AuthService) { }

  ngOnInit() {
    this.authSubscribe=this.authService.user.subscribe((user : User)=>{
       this.isAuthticated = !user ? false : true;
    });
  }


  OnSaveData() {
    this.datastorageService.storeRecipes();
  }

  OnFetchData() {
    this.datastorageService.FetchData().subscribe();
  }

  ngOnDestroy(): void {
    this.authSubscribe.unsubscribe();
  }

  OnLogOut() {
    this.authService.logOut();
  }
}
