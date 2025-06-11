import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService, Measurement } from '../../data.service';

@Component({
  selector: 'app-measurement',
  standalone: false,
  templateUrl: './measurement-edit.component.html',
  styleUrl: './measurement-edit.component.css'
})
export class MeasurementComponent implements OnInit {
  fb = inject(FormBuilder);
  dataService = inject(DataService);
  route = inject(ActivatedRoute);
  router = inject(Router);

  measurements = this.dataService.measurements$;

  ngOnInit(): void {

  }

  measurementForm = this.fb.group({
    measurementID: [0, [Validators.required]],
    measurementName: ['', [Validators.required]]
  });

  onSubmit(): void {
    let newMeasurement: Measurement = {
      measurementID: Number(this.measurementForm.value.measurementID),
      measurementName: this.measurementForm.value.measurementName!
    }

    this.dataService.createMeasurments(newMeasurement).subscribe(data => {
      this.dataService.getAllMeasurments();
      this.router.navigate(["measurement", data.measurementID]);
    });

    this.measurementForm.reset();
  };

  //removeMeasurement(index: number) {
  //  this.measurements.removeAt(index);
  //}

  onClear(): void {
    this.measurementForm.reset();
  }
}
