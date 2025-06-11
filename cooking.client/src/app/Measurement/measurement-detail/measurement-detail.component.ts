import { Component, inject, Input, OnInit } from '@angular/core';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-measurement-detail',
  standalone: false,
  templateUrl: './measurement-detail.component.html',
  styleUrl: './measurement-detail.component.css'
})
export class MeasurementDetailComponent implements OnInit{
 
  dataService = inject(DataService);

  @Input() measurements$ = this.dataService.measurements$;

  ngOnInit(): void {
    this.dataService.getAllMeasurments();
  }
}
