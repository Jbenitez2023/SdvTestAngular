import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VehicleService } from '../../Services/vehicle.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiResponse } from '../../Models/api-response.model';

@Component({
  selector: 'app-vehicles-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './vehicles-form.component.html',
  styleUrl: './vehicles-form.component.css'
})
export class VehiclesFormComponent {
  XForm: FormGroup;
  Id: number | null = null;
  response: ApiResponse | undefined;
  profession: ApiResponse | undefined;

  constructor(
    private fb: FormBuilder,
    private vehicleService:VehicleService,
    private route: ActivatedRoute,
    private router: Router)
    {

      this.Id = Number(this.route.snapshot.paramMap.get('id'));
      this.XForm = this.fb.group({
        id: [0, Validators.required],
        name: ['',[Validators.required, Validators.maxLength(50)]],
        vehicleType: ['',[Validators.required, Validators.maxLength(50)]],
        color: ['',[Validators.required, Validators.maxLength(50)]],
        maxVelocity: ['',[Validators.required, Validators.maxLength(50)]],
        capacity: ['',[Validators.required, Validators.maxLength(50)]],
      });
      

      if (this.Id) {
        this.vehicleService.getById(this.Id).subscribe((response) => {
          this.XForm.patchValue(response.result);
          console.log(response.result)
        });
      }
  }
  save() {
 
    if (this.XForm.valid) {
      var formData = this.XForm.value; // Aquí obtienes el objeto
      console.log(formData);
    }

    if (this.Id) {
      this.vehicleService.update(this.XForm.value).subscribe(() => {
        this.router.navigate(['/vehicle']);
      });
    } else {
      const formData = this.XForm.value;
      this.vehicleService.create(formData).subscribe(() => {
        this.router.navigate(['/vehicle']);
      });
    }
  }
}
