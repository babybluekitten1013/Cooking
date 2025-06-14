import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Recipe {
  recipeID: number,
  name: string,
  recipeTag: string,
  description: string,
  instructions: string,
  prepTime: string,
  cookTime: string,
  yield: number,
  imageURL: string,
  measurementIngredients: MeasurementIngredient[]
}

export interface MeasurementIngredient {
  measurementIngredientID: number,
  recipeID: number,
  quantity: number,
  details: string,
  ingredientName: string,
  measurementName: string,
  recipe: Recipe | null
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  http = inject(HttpClient);

  recipes$ = new BehaviorSubject<Recipe[]>([]);
  measurementIngredients$ = new BehaviorSubject<MeasurementIngredient[]>([]);

  selectedRecipe$ = new BehaviorSubject<Recipe | null>(null);
  selectedMeasurementIngredients$ = new BehaviorSubject<MeasurementIngredient | null>(null);

  constructor() {
    this.getAllRecipes();
    this.getAllMeasurementIngredients();
  }

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
  createRecipe(recipe: Recipe): Observable<Recipe> {
    return this.http.post<Recipe>(`api/Recipes`, recipe);
  }

  // update by id
  updateRecipe(id: number, recipe: Recipe): Observable<Recipe> {
    console.log("updated:", id, recipe);
    return this.http.put<Recipe>(`api/Recipes/${id}`, recipe);
  }

  // delete by id
  deleteRecipe(id: number) {
    this.http.delete<Recipe>(`api/Recipes/${id}`).subscribe(data => {
      this.getAllRecipes();
    })
  }

  // read all
  getAllMeasurementIngredients() {
    // call the api
    this.http.get<MeasurementIngredient[]>(`api/MeasurementIngredients`).subscribe(data => {
      this.measurementIngredients$.next(data);
    });
  }

  //get by id
  getMeasurementIngredients(id: number) {
    this.http.get<MeasurementIngredient>(`api/MeasurementIngredients/${id}`).subscribe(data => {
      this.selectedMeasurementIngredients$.next(data);
    })
  }

  // create
  createMeasurementIngredients(measurementIngredient: MeasurementIngredient) {
    this.http.post<MeasurementIngredient>(`api/MeasurementIngredients`, measurementIngredient).subscribe(data => {
      this.getAllMeasurementIngredients()
      this.getMeasurementIngredients(data.measurementIngredientID);
    })
  }

  // update by id
  updateMeasurementIngredients(id: number, measurementIngredient: MeasurementIngredient) {
    this.http.put<MeasurementIngredient>(`api/MeasurementIngredients/${id}`, measurementIngredient).subscribe(data => {
      this.getAllMeasurementIngredients()
      this.getMeasurementIngredients(data.measurementIngredientID);
    })
  }

  // delete by id
  deleteMeasurementIngredients(id: number): Observable<any> {
    return this.http.delete<MeasurementIngredient>(`api/MeasurementIngredients/${id}`);
  }
}
