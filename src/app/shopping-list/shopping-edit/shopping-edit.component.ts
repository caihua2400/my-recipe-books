import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {ingredient} from '../../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  @ViewChild('nameInput', {static: true}) nameInput: ElementRef;
  @ViewChild('amountInput', {static: true}) amountInput: ElementRef;



  constructor(private shoppinglistService : ShoppingListService) { }

  ngOnInit() {
  }

  onAddItem() {
    const newIngredient= new ingredient(this.nameInput.nativeElement.value,this.amountInput.nativeElement.value);
    this.shoppinglistService.addIngredient(newIngredient);


  }
}
