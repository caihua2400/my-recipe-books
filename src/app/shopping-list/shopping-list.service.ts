import {ingredient} from '../shared/ingredient.model';
import {EventEmitter} from '@angular/core';

export class ShoppingListService{
  private ingredients : ingredient[]=[
    new ingredient('apples',5),
    new ingredient('oranges',8)
  ];

  getIngredients(){
    return this.ingredients.slice();
  }

  ingredientChanged=new EventEmitter<ingredient[]>();

  addIngredient(ingredient : ingredient){
    this.ingredients.push(ingredient);
    this.ingredientChanged.emit(this.ingredients.slice());
  }

  addIngredients(ingredients: ingredient[]){

    this.ingredients.push(...ingredients);
    this.ingredientChanged.emit(this.ingredients.slice());
  }
}
