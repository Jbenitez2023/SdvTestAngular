import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MateriaService } from '../../Services/Materia.service';
import { EnemiesService } from '../../Services/enemie.service';
import { VehicleService } from '../../Services/vehicle.service';
import { PeopleService } from '../../Services/people.service';
import { WeaponService } from '../../Services/weapon.service';
import { ProfessionService } from '../../Services/professions.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiResponse } from '../../Models/api-response.model';
import { CommonModule } from '@angular/common';
import { GenericConsultService } from '../../Services/GenericConsult.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  template:`
  <div class="container">
    <div class="row  text-center">
      <div class="col "></div>
    </div>
    <div class="row  text-center">
      <div class="col">
        <h1>FFVIIAPI</h1>
        <h4>The Final Fantasy VII Info API</h4>
        <h5> what can you find in here?</h5>
      </div>
    </div>
    <div class="row">
      <div class="col "></div>
    </div>
    <div class="row  text-center" >
      <div class="col ">
        <p>Data about the Characters, Materia, weapons, Professions, vehicles and enemies <br>  Just come and lvl up with us! </p>
      </div>
    </div>
    <div class="row">
      <div class="col center"></div>
    </div>
    <div class="row">
      <div class="col d-flex ">
        <form [formGroup]="formGroup" class="mx-auto p-2" role="search">
          <div class="">
            <label for="basic-url" class="form-label">Select an API and ID</label>
            <div class="input-group">
              <span class="input-group-text" id="basic-addon3">http://sdvb.azurewebsites.net/api/</span>
              <select class="nav-item form-select form-select-sm" formControlName="api" aria-label="Small select example" >
                <option value="EnemiesAPI">EnemiesAPI/</option>
                <option value="MateriaAPI">MateriaAPI/</option>
                <option value="ProfessionAPI">ProfessionAPI/</option>
                <option value="VehiclesAPI">VehiclesAPI/</option>
                <option value="WeaponsAPI">WeaponsAPI/</option>
                <option value="PeopleAPI">PeopleAPI/</option>
              </select>
              <input class="form-control me-2" formControlName="id" type="search" placeholder="ID" aria-label="insert ID">
              <button class="btn btn-outline-success" (click)="getValue()">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                </svg>
              </button>
            </div>
          </div>
        </form> 
      </div>
    </div>
    <div class="row">
      <div class="col"></div>
      <div class="col ">
       <p class="text-center">Result</p>
       <div class="well" bis_skin_checked="1" style="overflow-y: auto; height:300px;width:500px;min-height:300px;min-width:500px;border:1px solid grey">
          <pre id="interactive_output" class="pre-scrollable"   *ngIf="response">{{ response | json }}</pre>
        </div>
      </div>
      <div class="col "></div>
    </div>
    <br/>
    <div class="row text-center">
    <div class="col ">
      <h5>What is this?</h5>
      <p> The FFVII API is a tool that allow you to know better about this world,his peopel,skills and more</p>
    </div>
      <!-- Carusel -->
      <div class="col ">
    <div id="carouselExampleAutoplaying" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-inner">
    
    <div class="carousel-item active">
      <img class="materia">
      <div class="carousel-caption d-none d-md-block">
        <h5>A materia that can give you abilities</h5>
        <p>those orbs are very special.</p>
      </div>
    </div>
    <div class="carousel-item">
      <img  class="chocobo">
      <div class="carousel-caption d-none d-md-block">
        <h5>A chocobo ,this bird can take you anywhere you want!</h5>
        <p>Is a yellow bird.</p>
      </div>
    </div>
    <div class="carousel-item">
      <img  class="weapon">
      <div class="carousel-caption d-none d-md-block">
        <h5>A This sword is powerfull!.</h5>
        <p>you can add materia in the weapon!.</p>
      </div>
    </div>
    <div class="carousel-item ">
      <img  class="d-block behemot" >
      <div class="carousel-caption d-none d-md-block">
        <h5>A This Monster is Dangerous!.</h5>
        <p>take kare!.</p>
      </div>
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
    </div>
    <!-- Carusel -->
      <div class="col ">
      <h5>How can I use it?</h5>
      <p> Just select an API and insert an ID if the ID exist in our DB it will return the data od the especifi API requested
        <br> You can see, Add, Delete or edit more data in the "Content" section
        <br> We also Have documentation!</p>
      </div>
     
    </div>
</div>
  `,
  styleUrl: './home.component.css'
})
export class HomeComponent {
  formGroup: FormGroup;
  Id: number | null = null;
  link:string = "";
  response: any;
  constructor(
    private fb: FormBuilder,
    private peopleService: PeopleService,
    private weaponService: WeaponService,
    private professionService: ProfessionService,
    private enemiesService: EnemiesService,
    private VehicleService: VehicleService,
    private MateriaService: MateriaService,
    private genericConsultService :GenericConsultService,
    private route: ActivatedRoute,
    private router: Router)
    { 
      this.formGroup = this.fb.group({
        api: ['PeopleAPI'], // Valor inicial
        id : ['']
      });
    }

    getValue(): void {
      let api = this.formGroup.get('api')?.value; // Obtiene el valor
      let id = this.formGroup.get('id')?.value; // Obtiene el valor
      this.link = "http://sdvb.azurewebsites.net/api/"+ api;
      this.genericConsultService.baseUrl = this.link

      this.genericConsultService.getById(id).subscribe((response) => {
        this.response = response.result
      });
      console.log(this.link);
    }
}
