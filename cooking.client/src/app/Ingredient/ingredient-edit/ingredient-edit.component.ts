import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { DataService, Ingredient } from '../../data.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-ingredient',
  standalone: false,
  templateUrl: './ingredient-edit.component.html',
  styleUrl: './ingredient-edit.component.css',
})
export class IngredientComponent implements OnInit {
  fb = inject(FormBuilder);
  dataService = inject(DataService);
  route = inject(ActivatedRoute);
  router = inject(Router);

  ingredients = this.dataService.ingredients$;

  ngOnInit(): void {

  }

  ingredientForm = this.fb.group({
    ingredientID: [0, [Validators.required]],
    name: ['', [Validators.required]],
    description: ['', [Validators.required]]
  })

  onSubmit(): void {
    let newIngredient: Ingredient = {
      ingredientID: Number(this.ingredientForm.value.ingredientID),
      name: this.ingredientForm.value.name!,
      description: this.ingredientForm.value.description!
    }

    this.dataService.createIngedients(newIngredient).subscribe(data => {
      this.dataService.getAllIngedients();
      this.router.navigate(["Ingredient", data.ingredientID])
    });

    this.ingredientForm.reset();
  };

  //removeIngredient() {
  //  this.ingredients.removeAt(index);
  //}

  onClear(): void {
    this.ingredientForm.reset();
  }
}
