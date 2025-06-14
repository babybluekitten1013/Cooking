import { Component, inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = Number(params.get("id"));

      this.dataService.recipes$.pipe(
        map((recipes: Recipe[]) => recipes.filter(recipe => recipe.recipeID == this.id)[0]),
      ).subscribe(data => {
        if (!data) {
          this.initEmptyForm();
        } else {
          this.initExistingForm(data);
        }
      })
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

      this.addIngredient();
      var item = this.measureIngred.controls[this.measureIngred.controls.length - 1];
      item.patchValue({
        measurementIngredientID: mi.measurementIngredientID,
        measurementName: mi.measurementName,
        ingredientName: mi.ingredientName,
        recipeID: mi.recipeID,
        quantity: mi.quantity,
        details: mi.details
      })
    })
  }

  //on submit function
  onSubmit(): void {

    if (this.id) {
      console.log("form", this.recipeForm.value);
      let newRecipe: Recipe = {
        recipeID: this.id,
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
      console.log("Updated", newRecipe);
      this.dataService.updateRecipe(this.id, newRecipe).subscribe(data => {
        console.log("Returned", data);
        this.dataService.getAllRecipes();
        this.router.navigate(["Recipes", this.id]);
      });
    }
    else {
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
        this.dataService.getAllRecipes();
        this.router.navigate(["Recipes", data.recipeID]);
      });
    }


  };

  get measureIngred(): FormArray {
    return this.recipeForm.controls.measurementIngredients as FormArray;
  }

  //getIngredientNameById(id: number): string {
  //  return this.ingredients.getValue().map((ingredients: Ingredient[]) => ingredients.filter((ingredient: Ingredient) => ingredient.ingredientID == id))
  //}

  addIngredient() {
    this.measureIngred.push(this.fb.group({
      measurementIngredientID: [0, [Validators.required]],
      measurementName: ['', [Validators.required]],
      ingredientName: ['', [Validators.required]],
      recipeID: [0, [Validators.required]],
      quantity: [0, [Validators.required]],
      details: ['', [Validators.required]]
    }));
  }

  removeIngredient(index: number) {
    this.dataService.deleteMeasurementIngredients(this.measureIngred.controls[index].value.measurementIngredientID).subscribe(data => {
      this.measureIngred.removeAt(index);
    })
    
  }

  //clear form function
  onClear(): void {
    this.recipeForm.reset();
  }
}
