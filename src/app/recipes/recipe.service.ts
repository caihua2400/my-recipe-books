import {Recipe} from './recipe.model';
import {EventEmitter, Injectable} from '@angular/core';
import {ingredient} from '../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService{
  recipeSelected = new EventEmitter<Recipe>();
  private recipes: Recipe[] = [
    new Recipe('Test Recipe 1', 'simple test description 1','/Users/huacai/desktop/testRecipe.jpeg',
      [new ingredient('meat',1),new ingredient('oil',2)]),
    new Recipe('Test Recipe 2', 'simple test description 2','/Users/huacai/desktop/testRecipe.jpeg'
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
}
