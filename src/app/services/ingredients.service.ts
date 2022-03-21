import { Injectable } from '@angular/core';
import { Ingredient } from '../models/ingredient.model';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class IngredientsService {
  collectionChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();

  ingredients: Ingredient[] = [
    new Ingredient('Apple', 2, 1),
    new Ingredient('Banana', 1, 2),
    new Ingredient('Potato', 2, 3),
    new Ingredient('Pork', 1.5, 4),
  ];

  constructor() { }

  add(ingredient: Ingredient) {
    ingredient.id = this.getNextId();

    this.ingredients.push(ingredient);

    this.collectionChanged.next(this.ingredients.slice());
  }

  delete(id: number) {
    this.ingredients = this.ingredients.filter(i => i.id === id);
  }

  update(id: number, updated: Ingredient) {
    const index = this.ingredients.findIndex(i => i.id === id);

    if (index === -1) {
      return;
    }

    const target = updated[index];

    target.name = updated.name;
    target.amount = updated.amount;

    this.collectionChanged.next(this.ingredients.slice());
  }

  get(id: number) {
    return this.ingredients.find(i => i.id === id);
  }

  private getNextId() {
    if (this.ingredients.length === 0) {
      return 0;
    }

    return Math.max(...this.ingredients.map(i => i.id));
  }
}
