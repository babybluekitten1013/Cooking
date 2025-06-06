import { Component, inject, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-landing',
  standalone: false,
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent implements OnInit {

  dataService = inject(DataService);

  recipes$ = this.dataService.recipes$;

  ngOnInit(): void {
    this.dataService.getAllRecipes();
  }
}
