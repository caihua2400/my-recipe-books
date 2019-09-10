import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {DataStorageService} from '../shared/data-storage.service';
import {RecipeService} from '../recipes/recipe.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  constructor(private datastorageService : DataStorageService) { }

  ngOnInit() {
  }


  OnSaveData() {
    this.datastorageService.storeRecipes();
  }

  OnFetchData() {
    this.datastorageService.FetchData().subscribe();
  }
}
