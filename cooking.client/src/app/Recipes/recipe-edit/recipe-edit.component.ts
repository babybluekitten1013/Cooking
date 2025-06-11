import { Component, inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { DataService, MeasurementIngredient, Recipe } from '../../data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { map, tap } from 'rxjs';
//TODO: finish update form
@Component({
  selector: 'app-recipe-edit',
  standalone: false,
  templateUrl: './recipe-edit.component.html',
  styleUrl: './recipe-edit.component.css'
})
export class RecipeEditComponent implements OnInit{
  fb = inject(FormBuilder);
  dataService = inject(DataService);
  route = inject(ActivatedRoute);
  router = inject(Router);

  id: number | null = null;

  ingredients = this.dataService.ingredients$;
  measurements = this.dataService.measurements$;

  ngOnInit(): void {
    this.dataService.recipes$.pipe(
      map((recipes: Recipe[]) => recipes.filter(recipe => recipe.recipeID == this.id)[0]),
      tap(val => console.log("Selected Recipe", val)),
    ).subscribe(data => {
      if (!data) {
        this.initEmptyForm();
      } else {
        this.initExistingForm(data);
      }
    })

    this.route.paramMap.subscribe(params => {
      this.id = Number(params.get("id"));
    })
  }

  //form group include validators
  recipeForm = this.fb.group({
    recipeID: [0, [Validators.required]],
    recipeName: ['', [Validators.required]],
    recipeTag: ['', [Validators.required]],
    description: ['', [Validators.required]],
    instructions: ['', [Validators.required]],
    prepTime: ['', [Validators.required]],
    cookTime: ['', [Validators.required]],
    yields: [0, [Validators.min(1)]],
    image: ['images/BananaChocBread.jpg', [Validators.required]],
    measurementIngredients: this.fb.array([])
  })

  initEmptyForm() {
    this.recipeForm.patchValue({
      recipeID: 0,
      recipeName: "",
      recipeTag: "",
      description: "",
      instructions: "",
      prepTime: "",
      cookTime: "",
      yields: 0,
      image: "",
      measurementIngredients: []
    })
  }

  initExistingForm(recipe: Recipe) {
    this.recipeForm.patchValue({
      recipeID: recipe.recipeID,
      recipeName: recipe.name,
      recipeTag: recipe.recipeTag,
      description: recipe.description,
      instructions: recipe.instructions,
      prepTime: recipe.prepTime,
      cookTime: recipe.cookTime,
      yields: recipe.yield,
      image: recipe.imageURL,
      measurementIngredients: []
    });

    recipe.measurementIngredients.forEach(mi => {
      this.measureIngred.push(this.fb.group({
        measurementIngredientID: [mi.measurementIngredientId, [Validators.required]],
        measurementID: [mi.measurementId, [Validators.required]],
        ingredientID: [mi.ingredientId, [Validators.required]],
        recipeID: [mi.recipeID, [Validators.required]],
        quantity: [mi.quantity, [Validators.required]],
        details: [mi.details, [Validators.required]]
      }))
    })
  }

  //on submit function
  onSubmit(): void {
    console.log("Form Submitted!")
    console.log(this.recipeForm.value)

    let newRecipe: Recipe = {
        recipeID: Number(this.recipeForm.value.recipeID),
        name: this.recipeForm.value.recipeName!,
        recipeTag: this.recipeForm.value.recipeTag!,
        description: this.recipeForm.value.description!,
        instructions: this.recipeForm.value.instructions!,
        prepTime: this.recipeForm.value.prepTime!,
        cookTime: this.recipeForm.value.cookTime!,
        yield: this.recipeForm.value.yields!,
        imageURL: this.recipeForm.value.image!,
        measurementIngredients: this.recipeForm.value.measurementIngredients as MeasurementIngredient[]
    }

    this.dataService.createRecipe(newRecipe).subscribe(data => {
      console.log("Created:", data)
      this.dataService.getAllRecipes();
      this.router.navigate(["Recipes", data.recipeID]);
      
    });
  };

  get measureIngred() {
    return this.recipeForm.controls.measurementIngredients as FormArray;
  }

  addIngredient() {
    this.measureIngred.push(this.fb.group({
      measurementIngredientID: [0, [Validators.required]],
      measurementID: [0, [Validators.required]],
      ingredientID: [0, [Validators.required]],
      recipeID: [0, [Validators.required]],
      quantity: [0, [Validators.required]],
      details: ['', [Validators.required]]
    }));
  }

  removeIngredient(index: number) {
    this.measureIngred.removeAt(index);
  }

  //clear form function
  onClear(): void {
    this.recipeForm.reset();
  }
}
