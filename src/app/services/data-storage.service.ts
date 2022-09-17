import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { RecipesService } from "./recipes.service";
import { Recipe } from "../models/recipe.model";
import { exhaustMap, map, take, tap } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  private baseUrl = 'https://my-recipes-app-backend-default-rtdb.europe-west1.firebasedatabase.app';

  constructor(private http: HttpClient,
              private recipeService: RecipesService) {
  }

  saveRecipes() {
    this.http.put(`${this.baseUrl}/recipes.json`, this.recipeService.getRecipes())
      .subscribe();
  }

  fetchRecipes() {
    return this.http.get<Recipe[]>(`${this.baseUrl}/recipes.json`).pipe(
      map(recipes => {
        return recipes.map(r => {
          return {...r, ingredients: r.ingredients ? r.ingredients : []}
        })
      }),
      tap(recipes => this.recipeService.setRecipes(recipes)));
  }
}
