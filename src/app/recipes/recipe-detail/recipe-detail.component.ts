import { Component, Input, OnInit } from '@angular/core';
import { IngredientsService } from 'src/app/services/ingredients.service';
import { Recipe } from '../../models/recipe.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  @Input() recipe: Recipe;

  constructor(private ingredientsService: IngredientsService) { }

  ngOnInit(): void {
  }

  onAddToShoplistClicked() {
    this.recipe.ingredients.forEach(i => {
      this.ingredientsService.add(i);
    })
  }
}
