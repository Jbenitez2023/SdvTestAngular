import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnemiesService } from '../../Services/enemie.service';
import { ApiResponse } from '../../Models/api-response.model';
import { RouterLink, RouterLinkActive } from '@angular/router';
@Component({
  selector: 'app-enemies',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
  <div class="container">
    <div class="row">
      <div class="col"> <h2 class=>Enemies</h2></div>
    </div>
    <div class="row">
      <div class="col"><a routerLink="/enemies/new" routerLinkActive="active" ariaCurrentWhenActive="page" class="btn btn-primary">Create</a></div>
      <div class="col"></div>
      <div class="col"></div>
    </div>
    <br/>
    <div class="row">
      <div class="col">
      <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Lvl</th>
          <th scope="col">Def</th>
          <th scope="col">Hp</th>
          <th scope="col">Str</th>
          <th scope="col">Weakness</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <tr routerLink="/enemies/edit/{{ enemy.id }}" routerLinkActive="active" ariaCurrentWhenActive="page" *ngFor="let enemy of response?.result">
          <td>{{ enemy.id }}</td>
          <td>{{ enemy.name }}</td>
          <td>{{ enemy.lvl }}</td>
          <td>{{ enemy.def }}</td>
          <td>{{ enemy.hp }}</td>
          <td>{{ enemy.str }}</td>
          <td>{{ enemy.elementalWeakness }}</td>
          <td>
            <button (click)="delete($event,enemy.id)" class="btn btn-danger " style="float:right;">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
      </div>
    </div>
  </div>
  
    
`,
  styleUrl: './enemies.component.css'
})
export class EnemiesComponent {
  response: ApiResponse | undefined;

  constructor(private enemiesService: EnemiesService) {
    this.load();
  }

  load() {
    this.enemiesService.getAll().subscribe((data) => {
      this.response = data;
      console.log(this.response)
    });
    
  }

  delete($event: MouseEvent,id: number) {
    $event.stopPropagation();
    if(confirm("¿Do you want to delete this record?")){
      this.enemiesService.delete(id).subscribe(() => {
        this.load();
      });
    }
  }
}
