import {Recipe} from './recipe.model';
import {EventEmitter, Injectable} from '@angular/core';
import {ingredient} from '../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list/shopping-list.service';
import {Subject} from 'rxjs';

@Injectable()
export class RecipeService{

  recipeSelected = new Subject<Recipe>();
  recipeChanged=new Subject<Recipe[]>();
  private recipes: Recipe[] = [
    new Recipe('Test Recipe 1', 'simple test description 1','assets/recipe-1.jpeg',
      [new ingredient('meat',1),new ingredient('oil',2)]),
    new Recipe('Test Recipe 2', 'simple test description 2','assets/recipe-2.jpeg'
    ,[new ingredient('nuts',2),new ingredient('cream',3)])
  ];

  getREcipes(){
    return this.recipes.slice();
  }

  getRecipe(id : number){
    return this.recipes[id];
  }

  constructor(private shoppinglistService : ShoppingListService){

  }

  addIngredientsToShoppingList(ingredients: ingredient[]){
this.shoppinglistService.addIngredients(ingredients);
  }

  addRecipe(recipe : Recipe){
     this.recipes.push(recipe);
     this.recipeChanged.next(this.recipes.slice());
  }

  updateRecipe(index : number, newRecipe : Recipe){
    this.recipes[index]=newRecipe;
    this.recipeChanged.next(this.recipes.slice());
  }

  deleteRecipe(index : number){
    this.recipes.splice(index,1);
    this.recipeChanged.next(this.recipes.slice());

  }
}
