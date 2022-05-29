import { BaseModel } from "./base-model.model";
import { Ingredient } from "./ingredient.model";

export class Recipe extends BaseModel {
  ingredients: Ingredient[] = [];

  constructor(public name?: string, public description?: string, public image?: string, ingredients?: Ingredient[], id?: number) {
    super(id);

    if (ingredients) {
      this.ingredients = ingredients;
    }
  }
}
