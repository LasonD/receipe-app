import { BaseModel } from "./base-model.model";

export class Recipe extends BaseModel {
  constructor(public name: string, public description: string, public image: string, id?: number) {
    super(id);
  }
}