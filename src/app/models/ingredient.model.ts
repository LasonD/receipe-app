import { BaseModel } from "./base-model.model";

export class Ingredient extends BaseModel {
  constructor(public name: string, public amount: number, id?: number) {
    super(id);
  }
}