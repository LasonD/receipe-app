import { Injectable } from '@angular/core';
import { Ingredient } from '../models/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class IngredientsService {
  ingredients: Ingredient[];

  constructor() { }

  add(ingredient: Ingredient) {
    ingredient.id = this.getNextId();

    this.ingredients.push(ingredient);
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
  }

  private getNextId() {
    if (this.ingredients.length === 0) {
      return 0;
    }

    return Math.max(...this.ingredients.map(i => i.id));
  }
}
