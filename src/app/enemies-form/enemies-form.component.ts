import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EnemiesService } from '../../Services/enemie.service';
import { ApiResponse } from '../../Models/api-response.model';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-enemies-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl :'./enemies-form.component.html',
  styleUrl: './enemies-form.component.css'
})
export class EnemiesFormComponent {
  XForm: FormGroup;
  Id: number | null = null;
  response: ApiResponse | undefined;
  profession: ApiResponse | undefined;

  constructor(
    private fb: FormBuilder,
    private enemiService:EnemiesService,
    private route: ActivatedRoute,
    private router: Router)
    {

      this.Id = Number(this.route.snapshot.paramMap.get('id'));
      this.XForm = this.fb.group({
        id: [0, [Validators.required]],
        name: ['', [Validators.required, Validators.maxLength(50)]],
        lvl: [0, [Validators.required, Validators.max(99)]],
        def: [0, [Validators.required, Validators.max(99)]],
        hp: [0, [Validators.required, Validators.max(9999)]],
        str: [0, [Validators.required, Validators.max(99)]],
        elementalWeakness: ['', [Validators.required, Validators.maxLength(50)]],
      });

      if (this.Id) {
        this.enemiService.getById(this.Id).subscribe((response) => {
          this.XForm.patchValue(response.result);
          console.log(response.result)
        });
      }
  }
  save() {
 
    if (this.XForm.invalid) {
      // Si el formulario es inválido, muestra errores y no envíes los datos
      this.XForm.markAllAsTouched(); // Marca todos los controles para mostrar los errores
      return;
    }

    if (this.XForm.valid) {
      var formData = this.XForm.value; // Aquí obtienes el objeto
      console.log(formData);
    }

    if (this.Id) {
      this.enemiService.update(this.XForm.value).subscribe(() => {
        this.router.navigate(['/enemies']);
      });
    } else {
      const formData = this.XForm.value;
      this.enemiService.create(formData).subscribe(() => {
        this.router.navigate(['/enemies']);
      });
    }
  }
}
