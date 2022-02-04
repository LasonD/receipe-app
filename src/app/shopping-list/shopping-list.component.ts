import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../models/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients = [
    new Ingredient("Apple", 5, 1),
    new Ingredient("Tomato", 10, 2),
    new Ingredient("Banana", 2, 3),
  ];

  constructor() { }

  ngOnInit(): void {
  }

  onItemAdded(item: Ingredient) {
    if (item) {
      this.ingredients.push(item);
    }
  }

}
