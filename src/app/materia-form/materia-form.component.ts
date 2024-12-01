import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MateriaService } from '../../Services/Materia.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-materia-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl:'./materia-form.component.html',
  styleUrl: './materia-form.component.css'
})
export class MateriaFormComponent {
  materiaForm: FormGroup;
  materiaId: number | null = null;


  constructor(
    private fb: FormBuilder,
    private MateriaService: MateriaService,
    private route: ActivatedRoute,
    private router: Router)
    {

      this.materiaId = Number(this.route.snapshot.paramMap.get('id'));
      this.materiaForm = this.fb.group({
        id: [0, Validators.required],
        name: ['', Validators.required],
        description: ["", [Validators.required]],
        lvl: [0, [Validators.required, Validators.min(1)]],
        color: ["", [Validators.required]],
        element: ["", [Validators.required]],
      });

      if (this.materiaId) {
        this.MateriaService.getById(this.materiaId).subscribe((data) => {
          this.materiaForm.patchValue(data.result);
          console.log(data.result)
        });
      }
  }

  save() {
 
    if (this.materiaForm.valid) {
      var formData = this.materiaForm.value; // Aquí obtienes el objeto
    }

    if (this.materiaId) {
      this.MateriaService.update(this.materiaForm.value).subscribe(() => {
        this.router.navigate(['/materia']);
      });
    } else {
   
      const formData = this.materiaForm.value;
      this.MateriaService.create(formData).subscribe(() => {
        this.router.navigate(['/materia']);
      });
    }
  }
}
