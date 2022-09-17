import { Component, OnInit } from '@angular/core';
import { RecipesService } from 'src/app/services/recipes.service';
import { Recipe } from '../../models/recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[];

  constructor(public recipesService: RecipesService) {
    this.recipes = recipesService.getRecipes();
  }

  ngOnInit(): void {
    console.log(this.recipes);

    this.recipesService.recipesChanged.subscribe(recipes => {
      console.log('New recipes: ', recipes);
      this.recipes = recipes;
    })
  }
}
