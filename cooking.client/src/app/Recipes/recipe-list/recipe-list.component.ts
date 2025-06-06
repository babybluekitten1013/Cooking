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

  // TODO: this is where the form needs to go
  createRecipe() {
    this.dataService.createRecipe({
        recipeID: 0,
        name: 'Toast',
        recipeTag: 'bread',
        description: 'cooked bread',
        instructions: 'put in toaster',
        prepTime: "1 minute",
        cookTime: "1 minute",
        yield: 2,
        imageURL: 'images/Bread.jpg',
        measurementIngredients: [
            {
                measurementIngredientId: 0,
                measurementId: 2,
                ingredientId: 3,
                recipeID: 0,
                quantity: 1,
                details: '',
                ingredient: {
                    ingredientId: 0,
                    name: 'Toasty Bread',
                    description: 'Yum Bread'
                },
                measurement: {
                    measurementId: 0,
                    measurementName: 'One Piece'
                },
                recipe: null
            }
        ],
    });
  }
}
