import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {Recipe} from './recipe.model';
import {Observable} from 'rxjs';
import {DataStorageService} from '../shared/data-storage.service';
import {RecipeService} from './recipe.service';


@Injectable(

)
export class RecipesResolverService implements Resolve<Recipe[]>{
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Recipe[]> | Promise<Recipe[]> | Recipe[] {
    const recipes=this.recipeService.getREcipes();
    if(recipes.length === 0){
      return this.dataStorageService.FetchData();
    }else{
        return recipes;
    }

  }

  constructor(private dataStorageService : DataStorageService,private recipeService : RecipeService){

  }

}
