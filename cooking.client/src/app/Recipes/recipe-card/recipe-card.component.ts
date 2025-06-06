import { Component, inject, Input, OnInit } from '@angular/core';
import { DataService, Recipe } from '../../data.service';

@Component({
  selector: 'app-recipe-card',
  standalone: false,
  templateUrl: './recipe-card.component.html',
  styleUrl: './recipe-card.component.css'
})
export class RecipeCardComponent implements OnInit{
 
  @Input() recipe: Recipe = {
      recipeID: 0,
      name: '',
      recipeTag: '',
      description: '',
      instructions: '',
      prepTime: '',
      cookTime: '',
      yield: 0,
      measurementIngredients: [],
      imageURL: ''
  }

  dataService = inject(DataService);

  ngOnInit(): void {
    if (this.recipe.recipeID < 1) {
      this.dataService.getAllRecipes();
    }
  }

  removeRecipe(id: number) {
    this.dataService.deleteRecipe(this.recipe.recipeID);
  }
}
