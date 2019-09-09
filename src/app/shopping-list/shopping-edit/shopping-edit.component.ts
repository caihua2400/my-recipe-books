import {Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {ingredient} from '../../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list.service';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit,OnDestroy {

subscription : Subscription;
editMode= false;
editedItemIndex : number;
editedIngredient: ingredient;
@ViewChild('f',{static: false}) shoppinglistForm : NgForm;



  constructor(private shoppinglistService : ShoppingListService) { }

  ngOnInit() {
   this.subscription= this.shoppinglistService.startedEditing.subscribe(
      (index : number)=>{
        this.editedItemIndex=index;
            this.editMode=true;
            this.editedIngredient=this.shoppinglistService.getIngredient(index);
            this.shoppinglistForm.setValue({
               name: this.editedIngredient.name,
              amount: this.editedIngredient.amount
            });
      }
    );
  }

  onAddItem(form : NgForm) {
    const value=form.value;
    const newIngredient= new ingredient(value.name,value.amount);

    if(this.editMode){
      this.shoppinglistService.updateIngredient(this.editedItemIndex,newIngredient);
    }else{
      this.shoppinglistService.addIngredient(newIngredient);
    }
    this.editMode=false;
    form.reset();


  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  OnClear() {
   this.editMode=false;
   this.shoppinglistForm.reset();
  }

  OnDelete() {
    this.shoppinglistService.deleteIngredient(this.editedItemIndex);
    this.OnClear();
  }
}
