import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Recipe {
  recipeID: number,
  name: string,
  recipeTag: string,
  description: string,
  instructions: string,
  measurementIngredients: MeasurementIngredient[]
}

export interface MeasurementIngredient {
  measurementIngredientId: number,
  measurementId: number,
  ingredientId: number,
  recipeID: number,
  quantity: number,
  details: string,
  ingredient: Ingredient | null,
  measurement: Measurement | null,
  recipe: Recipe | null
}

export interface Ingredient {
  ingredientId: number,
  name: string,
  description: string
}

export interface Measurement {
  measurementId: number,
  measurementName: string
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  http = inject(HttpClient);

  recipes$ = new BehaviorSubject<Recipe[]>([]);

  selectedRecipe$ = new BehaviorSubject<Recipe | null>(null);

  // read all
  getAllRecipes() {
    // call the api
    this.http.get<Recipe[]>(`api/Recipes`).subscribe(data => {
      this.recipes$.next(data);
    });
  }

  //get by id
  getRecipe(id: number) {
    this.http.get<Recipe>(`api/Recipes/${id}`).subscribe(data => {
      this.selectedRecipe$.next(data);
    })
  }

  // create
  createRecipe(recipe: Recipe) {
    this.http.post<Recipe>(`api/Recipes`, recipe).subscribe(data => {
      console.log("created", data)
      this.getAllRecipes();
      this.getRecipe(data.recipeID);
    })
  }

  // update by id
  updateRecipe(id: number, recipe: Recipe) {
    this.http.put<Recipe>(`api/Recipes/${id}`, recipe).subscribe(data => {
      this.getAllRecipes();
      this.getRecipe(data.recipeID);
    })
  }

  // delete by id
  deleteRecipe(id: number) {
    this.http.delete<Recipe>(`api/Recipes/${id}`).subscribe(data => {
      this.getAllRecipes();
      this.getRecipe(data.recipeID);
    })
  }
}
