import { Component, OnInit } from '@angular/core';
import {ingredient} from '../shared/ingredient.model';
import {ShoppingListService} from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients : ingredient[];

  constructor(private shoppinglistService : ShoppingListService) { }

  ngOnInit() {
    this.ingredients=this.shoppinglistService.getIngredients();
    this.shoppinglistService.ingredientChanged.subscribe(

      (ingredients : ingredient[])=>{
        this.ingredients=ingredients;
      }
    );
  }


}
