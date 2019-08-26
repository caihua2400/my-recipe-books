import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {ingredient} from '../../shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  @ViewChild('nameInput', {static: true}) nameInput: ElementRef;
  @ViewChild('amountInput', {static: true}) amountInput: ElementRef;

 @Output() IngredientAdded =new EventEmitter<ingredient>();

  constructor() { }

  ngOnInit() {
  }

  onAddItem() {
    const newIngredient= new ingredient(this.nameInput.nativeElement.value,this.amountInput.nativeElement.value);
    this.IngredientAdded.emit(newIngredient);
  }
}
