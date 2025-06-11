import { Component, inject, OnInit } from '@angular/core';
import { DataService, Recipe } from '../data.service';
import { BehaviorSubject, map, mergeMap } from 'rxjs';

@Component({
  selector: 'app-landing',
  standalone: false,
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent implements OnInit {

  dataService = inject(DataService);
  topFour$ = new BehaviorSubject<Recipe[]>([]);

  recipes$ = this.dataService.recipes$.pipe(
    map(arr => arr.filter(r => r.recipeTag == "featured"))
  ).subscribe(data => {
    this.topFour$.next(data);
  });

  ngOnInit(): void {
    this.dataService.getAllRecipes();
  }
}
