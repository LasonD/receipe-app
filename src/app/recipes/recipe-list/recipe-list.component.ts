import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  @Output() recipeSelected = new EventEmitter<Recipe>();

  recipes: Recipe[] = [
    new Recipe(
      'Test recipe',
      'My test recipe best description',
      'https://hips.hearstapps.com/hmg-prod/images/delish-roast-beef-horizontal-1540505165.jpg'),
    new Recipe(
      'Test recipe',
      'My test recipe best description',
      'https://hips.hearstapps.com/hmg-prod/images/delish-roast-beef-horizontal-1540505165.jpg'),
    new Recipe(
      'Test recipe',
      'My test recipe best description',
      'https://hips.hearstapps.com/hmg-prod/images/delish-roast-beef-horizontal-1540505165.jpg')
  ];

  constructor() { }

  ngOnInit(): void {
  }

  onRecipeSelected(recipe: Recipe) {
    this.recipeSelected.emit(recipe);
  }

}
