import {ingredient} from '../shared/ingredient.model';
import {EventEmitter} from '@angular/core';
import {Subject} from 'rxjs';

export class ShoppingListService{
  private ingredients : ingredient[]=[
    new ingredient('apples',5),
    new ingredient('oranges',8)
  ];

  getIngredients(){
    return this.ingredients.slice();
  }

  getIngredient(index : number) : ingredient{
    return this.ingredients[index];
  }

  ingredientChanged=new Subject<ingredient[]>();
  startedEditing=new Subject<number>();

  addIngredient(ingredient : ingredient){
    this.ingredients.push(ingredient);
    this.ingredientChanged.next(this.ingredients.slice());
  }

  addIngredients(ingredients: ingredient[]){

    this.ingredients.push(...ingredients);
    this.ingredientChanged.next(this.ingredients.slice());
  }

  updateIngredient(index : number, newIngredient : ingredient){
    this.ingredients[index]=newIngredient;
    this.ingredientChanged.next(this.ingredients.slice());
  }

  deleteIngredient(index : number){
    this.ingredients.splice(index,1);
    this.ingredientChanged.next(this.ingredients.slice());
  }
}
