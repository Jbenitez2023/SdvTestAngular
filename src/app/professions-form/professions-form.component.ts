import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfessionService } from '../../Services/professions.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiResponse } from '../../Models/api-response.model';

@Component({
  selector: 'app-professions-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './professions-form.component.html',
  styleUrl: './professions-form.component.css'
})
export class ProfessionsFormComponent {
  XForm: FormGroup;
  Id: number | null = null;
  response: ApiResponse | undefined;
  profession: ApiResponse | undefined;

  constructor(
    private fb: FormBuilder,
    private ProfessionService:ProfessionService,
    private route: ActivatedRoute,
    private router: Router)
    {

      this.Id = Number(this.route.snapshot.paramMap.get('id'));
      this.XForm = this.fb.group({
        id: [0, Validators.required],
        name: ['', Validators.required],
        strBoost: [0, [Validators.required, Validators.max(99)]],
        defBoost: [0, [Validators.required, Validators.max(99)]],
        hpBoost: [0, [Validators.required, Validators.max(99)]],
        speedBoost: [0, [Validators.required, Validators.max(99)]]
      });
      
      if (this.Id) {
        this.ProfessionService.getById(this.Id).subscribe((response) => {
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
      this.ProfessionService.update(this.XForm.value).subscribe(() => {
        this.router.navigate(['/profession']);
      });
    } else {
   
      const formData = this.XForm.value;
      this.ProfessionService.create(formData).subscribe(() => {
        this.router.navigate(['/profession']);
      });
    }
  }
}
