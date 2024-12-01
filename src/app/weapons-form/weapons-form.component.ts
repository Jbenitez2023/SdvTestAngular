import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WeaponService } from '../../Services/weapon.service';
import { ProfessionService } from '../../Services/professions.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiResponse } from '../../Models/api-response.model';

@Component({
  selector: 'app-weapons-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './weapons-form.component.html',
  styleUrl: './weapons-form.component.css'
})
export class WeaponsFormComponent {
  XForm: FormGroup;
  Id: number | null = null;
  response: ApiResponse | undefined;
  profession: ApiResponse | undefined;

  constructor(
    private fb: FormBuilder,
    private weaponService:WeaponService,
    private ProfessionService:ProfessionService,
    private route: ActivatedRoute,
    private router: Router)
    {

      this.Id = Number(this.route.snapshot.paramMap.get('id'));
      this.XForm = this.fb.group({
        id: [0, Validators.required],
        name: ['', Validators.required],
        idProfession: [0, [Validators.required, Validators.min(1)]],
        strBoost: [0, [Validators.required, Validators.min(1)]],
        mgBoost: [0, [Validators.required, Validators.min(1)]],
      });
      
   
      this.loadProfession();

      if (this.Id) {
        this.weaponService.getById(this.Id).subscribe((data) => {
          this.XForm.patchValue(data.result);
          console.log(data.result)
        });
      }
  }
  loadProfession() {
    this.ProfessionService.getAll().subscribe((data) => {
      this.profession = data;
      
    });
  }

  save() {
 
    if (this.XForm.valid) {
      var formData = this.XForm.value; // Aquí obtienes el objeto
      console.log(formData);
    }

    if (this.Id) {
      this.weaponService.update(this.XForm.value).subscribe(() => {
        this.router.navigate(['/weapon']);
      });
    } else {
   
      const formData = this.XForm.value;
      this.weaponService.create(formData).subscribe(() => {
        this.router.navigate(['/weapon']);
      });
    }
  }
}
