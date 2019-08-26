import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Recipe} from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  @Output() recipeSelectedEvent = new EventEmitter<Recipe>();
  recipes: Recipe[] = [
    new Recipe('Test Recipe 1', 'simple test description 1','/Users/huacai/desktop/testRecipe.jpeg'),
    new Recipe('Test Recipe 2', 'simple test description 2','/Users/huacai/desktop/testRecipe.jpeg')
  ];
  constructor() { }

  ngOnInit() {
  }

  onRecipeSelected(El : Recipe) {
    this.recipeSelectedEvent.emit(El);
  }
}
