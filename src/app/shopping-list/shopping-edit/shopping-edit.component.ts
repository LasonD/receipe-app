import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { Ingredient } from 'src/app/models/ingredient.model';
import { IngredientsService } from 'src/app/services/ingredients.service';
import { NgForm } from "@angular/forms";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('form', { static: false }) itemForm: NgForm;

  editingSubscription: Subscription;

  editMode = false;
  editIngredientId: number;

  constructor(public ingredientsService: IngredientsService) { }

  ngOnInit(): void {
    this.editingSubscription = this.ingredientsService.startedEditing.subscribe(
      (id: number) => {
        this.editMode = true;
        const ingredient = this.ingredientsService.get(id);
        this.editIngredientId = id;
        this.itemForm.setValue({
          name: ingredient.name,
          amount: ingredient.amount
        })
      }
    );
  }

  onSubmit() {
    console.log(this.itemForm);

    const ingredient = new Ingredient(
      this.itemForm.value.name,
      this.itemForm.value.amount);

    if (this.editMode) {
      this.ingredientsService.update(this.editIngredientId, ingredient);
    } else {
      this.ingredientsService.add(ingredient);
    }

    this.editMode = false;
    this.itemForm.resetForm();
  }

  ngOnDestroy() {
    this.editingSubscription.unsubscribe();
  }
}
