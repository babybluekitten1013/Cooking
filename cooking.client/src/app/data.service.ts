import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Recipe {
  recipeID: number,
  name: string,
  recipeTag: string,
  description: string,
  instructions: string,
  imageURL: string,
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
  ingredients$ = new BehaviorSubject<Ingredient[]>([]);
  measurements$ = new BehaviorSubject<Measurement[]>([]);
  measurementIngredients$ = new BehaviorSubject<MeasurementIngredient[]>([]);

  selectedRecipe$ = new BehaviorSubject<Recipe | null>(null);
  selectedIngredient$ = new BehaviorSubject<Ingredient | null>(null);
  selectedMeasurements$ = new BehaviorSubject<Measurement | null>(null);
  selectedMeasurementIngredients$ = new BehaviorSubject<MeasurementIngredient | null>(null);

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

  // read all
  getAllIngedients() {
    // call the api
    this.http.get<Ingredient[]>(`api/Ingredients`).subscribe(data => {
      this.ingredients$.next(data);
    });
  }

  //get by id
  getIngedients(id: number) {
    this.http.get<Ingredient>(`api/Ingredients/${id}`).subscribe(data => {
      this.selectedIngredient$.next(data);
    })
  }

  // create
  createIngedients(ingredient: Ingredient) {
    this.http.post<Ingredient>(`api/Ingredients`, ingredient).subscribe(data => {
      this.getAllIngedients();
      this.getIngedients(data.ingredientId);
    })
  }

  // update by id
  updateIngedients(id: number, ingredient: Ingredient) {
    this.http.put<Ingredient>(`api/Ingredients/${id}`, ingredient).subscribe(data => {
      this.getAllIngedients();
      this.getIngedients(data.ingredientId);
    })
  }

  // delete by id
  deleteIngedients(id: number) {
    this.http.delete<Ingredient>(`api/Ingredients/${id}`).subscribe(data => {
      this.getAllIngedients();
      this.getIngedients(data.ingredientId);
    })
  }

  // read all
  getAllMeasurments() {
    // call the api
    this.http.get<Measurement[]>(`api/Measurements`).subscribe(data => {
      this.measurements$.next(data);
    });
  }

  //get by id
  getMeasurments(id: number) {
    this.http.get<Measurement>(`api/Measurements/${id}`).subscribe(data => {
      this.selectedMeasurements$.next(data);
    })
  }

  // create
  createMeasurments(measurement: Measurement) {
    this.http.post<Measurement>(`api/Measurements`, measurement).subscribe(data => {
      this.getAllMeasurments()
      this.getMeasurments(data.measurementId);
    })
  }

  // update by id
  updateMeasurments(id: number, measurement: Measurement) {
    this.http.put<Measurement>(`api/Measurements/${id}`, measurement).subscribe(data => {
      this.getAllMeasurments()
      this.getMeasurments(data.measurementId);
    })
  }

  // delete by id
  deleteMeasurments(id: number) {
    this.http.delete<Measurement>(`api/Measurements/${id}`).subscribe(data => {
      this.getAllMeasurments()
      this.getMeasurments(data.measurementId);
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
      this.getMeasurementIngredients(data.measurementIngredientId);
    })
  }

  // update by id
  updateMeasurementIngredients(id: number, measurementIngredient: MeasurementIngredient) {
    this.http.put<MeasurementIngredient>(`api/MeasurementIngredients/${id}`, measurementIngredient).subscribe(data => {
      this.getAllMeasurementIngredients()
      this.getMeasurementIngredients(data.measurementIngredientId);
    })
  }

  // delete by id
  deleteMeasurementIngredients(id: number) {
    this.http.delete<MeasurementIngredient>(`api/MeasurementIngredients/${id}`).subscribe(data => {
      this.getAllMeasurementIngredients()
      this.getMeasurementIngredients(data.measurementIngredientId);
    })
  }
}
