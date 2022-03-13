import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IngredientsService } from 'src/app/services/ingredients.service';
import { RecipesService } from 'src/app/services/recipes.service';
import { Recipe } from '../../models/recipe.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;

  constructor(private ingredientsService: IngredientsService,
              private recipeService: RecipesService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(p => this.fetchRecipe(+p['id']))
  }

  fetchRecipe(id: number) {
    this.recipe = this.recipeService.get(id);
  }

  onAddToShoplistClicked() {
    this.recipe.ingredients.forEach(i => {
      this.ingredientsService.add(i);
    })
  }
}
