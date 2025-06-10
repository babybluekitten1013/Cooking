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
}
