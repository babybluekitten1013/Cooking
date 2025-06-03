import { Component, Input } from '@angular/core';
import { Recipe } from '../../data.service';

@Component({
  selector: 'app-recipe-card',
  standalone: false,
  templateUrl: './recipe-card.component.html',
  styleUrl: './recipe-card.component.css'
})
export class RecipeCardComponent {
  @Input() recipe: Recipe = {
      recipeID: 0,
      name: '',
      recipeTag: '',
      description: '',
      instructions: '',
      measurementIngredients: []
  }
}
