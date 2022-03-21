import { Component, OnInit } from '@angular/core';
import { RecipesService } from "../../services/recipes.service";
import { ActivatedRoute } from "@angular/router";
import { Recipe } from "../../models/recipe.model";

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  recipe: Recipe;
  isEdit: boolean;

  constructor(private recipesService: RecipesService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(p => {
      const id = p['id'];
      if (id) {
        this.recipe = this.recipesService.get(+id);
        this.isEdit = true;
      } else {
        this.isEdit = false;
      }
    })
  }

}
