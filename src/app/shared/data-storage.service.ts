import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RecipeService} from '../recipes/recipe.service';
import {Recipe} from '../recipes/recipe.model';
import {map, tap} from 'rxjs/operators';
import {ingredient} from './ingredient.model';


@Injectable({
  providedIn: 'root'
})
export class DataStorageService{
 constructor(private http : HttpClient,private recipeService : RecipeService){

 }

 storeRecipes(){
   const recipes= this.recipeService.getREcipes();
   this.http.put('https://ng-recipe-books-7ba2c.firebaseio.com/recipes.json',recipes).subscribe((response)=>{

   });
 }

   FetchData(){
     return  this.http.get<Recipe[]>('https://ng-recipe-books-7ba2c.firebaseio.com/recipes.json').
    pipe(map(recipes=>{
      return recipes.map(recipe=>{
          return {...recipe,ingredients: recipe.ingredients ? recipe.ingredients : []};
      });
    }),
    tap(recipes=>{
      this.recipeService.setRecipes(recipes);
    })
    )

   }
}
