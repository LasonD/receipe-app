import { Injectable } from '@angular/core';
import { Ingredient } from '../models/ingredient.model';
import { Recipe } from '../models/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  recipes: Recipe[] = [
    new Recipe(
      'Test recipe 1',
      'My test recipe best description 1',
      'https://hips.hearstapps.com/hmg-prod/images/delish-roast-beef-horizontal-1540505165.jpg', [new Ingredient('Potato', 2)],
      1),
    new Recipe(
      'Test recipe 2',
      'My test recipe best description 2',
      'https://hips.hearstapps.com/hmg-prod/images/delish-roast-beef-horizontal-1540505165.jpg', [new Ingredient('Potato', 3), new Ingredient('Apple', 2),],
      2),
    new Recipe(
      'Test recipe 3',
      'My test recipe best description 3',
      'https://hips.hearstapps.com/hmg-prod/images/delish-roast-beef-horizontal-1540505165.jpg', null,
      3)
  ];

  constructor() { }

  get(id: number) {
    return this.recipes.find(r => r.id === id);
  }

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
