import { Component, inject, OnInit } from '@angular/core';
import { DataService, Recipe } from '../../data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, map, tap } from 'rxjs';

@Component({
  selector: 'app-recipe-detail',
  standalone: false,
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.css'
})
export class RecipeDetailComponent implements OnInit {
  dataService = inject(DataService);
  router = inject(Router);
  route = inject(ActivatedRoute);

  recipeID: number = 0
  recipe$ = this.dataService.recipes$.pipe(
    map((recipes: Recipe[]) => recipes.filter(recipe => recipe.recipeID == this.recipeID)[0]),
    tap(val => console.log("Selected Recipe", val)),
  )


  ngOnInit(): void {
    this.dataService.getAllRecipes()
    this.route.paramMap.subscribe(params => {
      this.recipeID = Number(params.get('id'));
    })
  }

  onPrint(): void {
    window.print();
  }
}
