import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { DataService, MeasurementIngredient, Recipe } from '../../data.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-edit',
  standalone: false,
  templateUrl: './recipe-edit.component.html',
  styleUrl: './recipe-edit.component.css'
})
export class RecipeEditComponent {
  fb = inject(FormBuilder);
  dataservice = inject(DataService);
  route = inject(ActivatedRoute);
  router = inject(Router);

  ingredients = this.dataservice.ingredients$;
  measurements = this.dataservice.measurements$;


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

  //on submit function
  onSubmit(): void {
    console.log("Form Submitted!")
    console.log(this.recipeForm.value)

    //let newRecipe: Recipe = {
    //    recipeID: Number(this.recipeForm.value.recipeID),
    //    name: this.recipeForm.value.recipeName!,
    //    recipeTag: this.recipeForm.value.recipeTag!,
    //    description: this.recipeForm.value.description!,
    //    instructions: this.recipeForm.value.instructions!,
    //    prepTime: this.recipeForm.value.prepTime!,
    //    cookTime: this.recipeForm.value.cookTime!,
    //    yield: this.recipeForm.value.yields!,
    //    imageURL: this.recipeForm.value.image!,
    //    measurementIngredients: this.recipeForm.value.measurementIngredients as MeasurementIngredient[]
    //}

    //this.dataservice.createRecipe(newRecipe).subscribe(data => {
    //  console.log("Created:", data)
    //  this.dataservice.getAllRecipes();
    //  this.router.navigate(["Recipes", data.recipeID]);
      
    //});
  };
  //initalize form function
  OnInit(): void {
    console.log("Some code here!")
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
