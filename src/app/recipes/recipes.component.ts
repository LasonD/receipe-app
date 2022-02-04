import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../models/recipe.model';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
  @Input() selectedRecipe: Recipe;

  constructor() { }

  ngOnInit(): void {
  }

  onRecipeSelected(newSelectedRecipe: Recipe) {
    if (newSelectedRecipe === this.selectedRecipe) {
      this.selectedRecipe = null;
      return;
    }

    this.selectedRecipe = newSelectedRecipe;
  }

}
