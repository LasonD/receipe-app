import { Component, OnInit, Output } from '@angular/core';
import { Ingredient } from '../models/ingredient.model';
import { IngredientsService } from '../services/ingredients.service';
import { Subject } from "rxjs";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[];

  constructor(public ingredientsService: IngredientsService) {
    this.ingredients = ingredientsService.ingredients;
  }

  ngOnInit(): void {
    this.ingredientsService.collectionChanged.subscribe(
      (ingredients) => this.ingredients = ingredients
    );
  }

  onIngredientSelected(id: number) {
    this.ingredientsService.startedEditing.next(id);
  }
}
