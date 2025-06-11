import { Component, inject, Input, OnInit } from '@angular/core';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-ingredient-detail',
  standalone: false,
  templateUrl: './ingredient-detail.component.html',
  styleUrl: './ingredient-detail.component.css'
})
export class IngredientDetailComponent implements OnInit{

  dataService = inject(DataService);

  @Input() ingredients$ = this.dataService.ingredients$;

  ngOnInit(): void {
    this.dataService.getAllIngedients();
  }

  removeIngredient(id: number): void {
    // remove an ingredient
  }
}
