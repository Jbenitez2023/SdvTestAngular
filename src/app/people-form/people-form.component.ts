import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import { PeopleService } from '../../Services/people.service';
import { WeaponService } from '../../Services/weapon.service';
import { ProfessionService } from '../../Services/professions.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiResponse } from '../../Models/api-response.model';
import { PersonMateria } from '../../Models/Person_materia.models';
import { Person } from '../../Models/Person.model';
import { MateriaService } from '../../Services/Materia.service';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-people-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,FormsModule],
 templateUrl:'./people-form.component.html',
})
export class PeopleFormComponent {

  peopleForm: FormGroup;
  peopleMateriaForm: FormGroup;
  personId: number | null = null;
  weapon: ApiResponse | undefined;
  profession: ApiResponse | undefined;
  materia: ApiResponse | undefined;
  response : ApiResponse | undefined;
  person : Person | undefined
  personMateria!: PersonMateria;

  constructor(
    private fb: FormBuilder,
    private peopleService: PeopleService,
    private weaponService:WeaponService,
    private ProfessionService:ProfessionService,
    private MateriaService:MateriaService,
    private route: ActivatedRoute,
    private router: Router)
    {

      this.personId = Number(this.route.snapshot.paramMap.get('id'));
      this.peopleForm = this.fb.group({
        id: [0, Validators.required],
        name: ['', Validators.required],
        age: [0, [Validators.required, Validators.min(1)]],
        lvl: [0, [Validators.required, Validators.min(1)]],
        idWeaponEquiped: [0, [Validators.required, Validators.min(1)]],
        idProfession: [0, [Validators.required, Validators.min(1)]],
      });

      this.peopleMateriaForm = this.fb.group({
        idPeople: [0, Validators.required],
        idMateria: [0, [Validators.required, Validators.min(1)]],
      });


      
      this.loadWeapon();
      this.loadProfession();
      this.loadMateria();

      if (this.personId) {
          this.peopleService.getById(this.personId).subscribe((data) => {
          this.peopleForm.patchValue(data.result);
          this.response = data;
          this.person = data.result as unknown as Person;
        });
      }
  }

  loadWeapon() {
    this.weaponService.getAll().subscribe((data) => {
      this.weapon = data;
    });
  }

  loadProfession() {
    this.ProfessionService.getAll().subscribe((data) => {
      this.profession = data;
      
    });
  }

  loadMateria() {
    this.MateriaService.getAll().subscribe((data) => {
      this.materia = data;
    });
  }

  addMateria(){
    this.peopleMateriaForm.patchValue({
      idPeople: this.route.snapshot.paramMap.get('id'),  // Actualiza solo los valores proporcionados
    });

    this.peopleService.addMateria(this.peopleMateriaForm.value).subscribe(() => {
       window.location.reload();
    });

  }
  
  removeMateria(id:number){
    this.peopleService.removeMateria(id).subscribe(() => {
       window.location.reload();
    });

  }
  save() {
 
    if (this.peopleForm.valid) {
      var formData = this.peopleForm.value; // Aquí obtienes el objeto
    }

    if (this.personId) {
      this.peopleService.update(this.peopleForm.value).subscribe(() => {
        this.router.navigate(['/people']);
      });
    } else {
   
      const formData = this.peopleForm.value;
      console.log(formData)
      this.peopleService.create(formData).subscribe(() => {
        this.router.navigate(['/people']);
      });
    }
  }
}
