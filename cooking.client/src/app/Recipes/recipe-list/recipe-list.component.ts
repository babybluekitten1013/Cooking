import { Component, inject, OnInit } from '@angular/core';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-recipe-list',
  standalone: false,
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css'
})
export class RecipeListComponent implements OnInit {

  dataService = inject(DataService);

  recipes$ = this.dataService.recipes$;

  ngOnInit(): void {
    this.dataService.getAllRecipes();
  }

  createRecipe() {
    this.dataService.createRecipe({
        recipeID: 0,
        name: 'Toast',
        recipeTag: 'bread',
        description: 'cooked bread',
        instructions: 'put in toaster',
        measurementIngredients: [
            {
                measurementIngredientId: 0,
                measurementId: 0,
                ingredientId: 0,
                recipeID: 0,
                quantity: 1,
                details: '',
                ingredient: {
                    ingredientId: 0,
                    name: 'Bread',
                    description: 'Yum Bread'
                },
                measurement: {
                    measurementId: 0,
                    measurementName: 'Piece'
                },
                recipe: null
            }
        ],
        imageURL: ''
    });
  }
}
