import { Component, OnInit } from '@angular/core';
import { RecipesService } from "../../services/recipes.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Recipe } from "../../models/recipe.model";
import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import { Ingredient } from "../../models/ingredient.model";

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  recipe: Recipe;
  isEdit: boolean;
  recipeForm: FormGroup;

  get ingredientFormArray() {
    return (<FormArray>this.recipeForm.get('ingredients'));
  }

  get ingredientFromGroups() {
    return this.ingredientFormArray.controls;
  }

  constructor(private recipesService: RecipesService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(p => {
      const id = p['id'];
      if (id) {
        this.recipe = this.recipesService.get(+id);
        this.isEdit = true;
      } else {
        this.recipe = new Recipe();
        this.isEdit = false;
      }

      this.initForm();
    })
  }

  private initForm() {
    const name = this.isEdit ? this.recipe.name : '';
    const imagePath = this.isEdit ? this.recipe.image : '';
    const description = this.isEdit ? this.recipe.description : '';
    const ingredients = this.isEdit ? this.recipe.ingredients : [];

    this.recipeForm = new FormGroup({
      'name': new FormControl(name, [Validators.required]),
      'imagePath': new FormControl(imagePath, [Validators.required]),
      'description': new FormControl(description,[Validators.required]),
      'ingredients': new FormArray(ingredients.map(i => this.createIngredientFormGroup(i)), [Validators.required])
    });
  }

  onSubmit() {
    this.recipe.name = this.recipeForm.get('name').value;
    this.recipe.image = this.recipeForm.get('imagePath').value;
    this.recipe.description = this.recipeForm.get('description').value;
    this.recipe.ingredients = this.ingredientFromGroups.map(g => this.restoreIngredientFromFormGroup(<FormGroup>g));

    if (this.isEdit) {
      this.recipesService.update(this.recipe.id, this.recipe);
    } else {
      this.recipesService.add(this.recipe);
    }
    this.onCancel();
  }

  onAddIngredient() {
    const ingredientsFormArray = <FormArray>this.recipeForm.get('ingredients');

    ingredientsFormArray.push(this.createIngredientFormGroup());
  }

  onDeleteIngredient(i: number) {
    this.ingredientFromGroups.splice(i, 1);
  }

  private restoreIngredientFromFormGroup(ingredientFormGroup: FormGroup) {
    const name = ingredientFormGroup.get('name').value;
    const amount = +ingredientFormGroup.get('amount').value;

    return new Ingredient(name, amount);
  }

  private createIngredientFormGroup(ingredient?: Ingredient) {
    return new FormGroup({
      'id': new FormControl(ingredient?.id),
      'name': new FormControl(ingredient?.name, [Validators.required]),
      'amount': new FormControl(ingredient?.amount, [Validators.required, Validators.min(1)])
    });
  }

  onCancel() {
    this.router.navigate(['../../'], {relativeTo: this.route});
  }
}
