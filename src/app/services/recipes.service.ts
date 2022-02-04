import { Injectable } from '@angular/core';
import { Recipe } from '../models/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  recipes: Recipe[];

  constructor() { }

  add(recipe: Recipe) {
    recipe.id = this.getNextId();

    this.recipes.push(recipe);
  }

  delete(id: number) {
    this.recipes = this.recipes.filter(i => i.id === id);
  }

  update(id: number, updated: Recipe) {
    const index = this.recipes.findIndex(i => i.id === id);

    if (index === -1) {
      return;
    }

    const target = updated[index];

    target.name = updated.name;
    target.description = updated.description;
    target.image = updated.image;
  }

  private getNextId() {
    if (this.recipes.length === 0) {
      return 0;
    }

    return Math.max(...this.recipes.map(i => i.id));
  }
}
