import {Component, OnDestroy, OnInit} from '@angular/core';
import {ingredient} from '../shared/ingredient.model';
import {ShoppingListService} from './shopping-list.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {
    this.IgSubscribe.unsubscribe();
  }
  ingredients : ingredient[];
  private IgSubscribe: Subscription;

  constructor(private shoppinglistService : ShoppingListService) { }

  ngOnInit() {
    this.ingredients=this.shoppinglistService.getIngredients();
   this.IgSubscribe= this.shoppinglistService.ingredientChanged.subscribe(

      (ingredients : ingredient[])=>{
        this.ingredients=ingredients;
      }
    );
  }


  OnEditItem(i: number) {
    this.shoppinglistService.startedEditing.next(i);
  }
}
