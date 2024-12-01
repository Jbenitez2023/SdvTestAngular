import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PeopleService } from '../../Services/people.service';
import { ApiResponse } from '../../Models/api-response.model';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-people',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `

<div class="container">
    <div class="row">
      <div class="col"><h2>Characters</h2></div>
    </div>
    <div class="row">
      <div class="col">
        <a routerLink="/people/new" routerLinkActive="active" ariaCurrentWhenActive="page" class="btn btn-primary">Create</a>
      </div>
    </div>
    <br/>
    <div class="row">
      <div class="col">
        <table class="table table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Age</th>
              <th scope="col">Profession</th>
              <th scope="col">Weapon</th>
              <th scope="col">lvl</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
          <tr routerLink="/people/edit/{{ person.id }}" routerLinkActive="active" ariaCurrentWhenActive="page" *ngFor="let person of people?.result">
                  <td>{{ person.id }}</td>
                  <td>{{ person.name }}</td>
                  <td>{{ person.age }}</td>
                  <td>{{ person.professions.name }}</td>
                  <td>{{ person.weapons.name }}</td>
                  <td>{{ person.lvl }}</td>
                  <td>
                    <button (click)="deletePerson($event,person.id)" class="btn btn-danger">Delete</button>
                  </td>
                </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
})
export class PeopleComponent {
  people: ApiResponse | undefined;

  constructor(private peopleService: PeopleService) {
    this.loadPeople();
  }

  loadPeople() {
    this.peopleService.getAll().subscribe((data) => {
      this.people = data;
      console.log(this.people)
    });
    
  }

  deletePerson($event: MouseEvent,id: number) {
    $event.stopPropagation();
    if(confirm("¿Do you want to delete this record?")){
      this.peopleService.delete(id).subscribe(() => {
        this.loadPeople();
      });
    }
  }
}
