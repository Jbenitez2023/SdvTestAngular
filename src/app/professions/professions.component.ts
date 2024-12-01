import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfessionService } from '../../Services/professions.service';
import { ApiResponse } from '../../Models/api-response.model';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-professions',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './professions.component.html',
  styleUrl: './professions.component.css'
})
export class ProfessionsComponent {
  response: ApiResponse | undefined;

  constructor(private professionService: ProfessionService) {
    this.load();
  }

  load() {
    this.professionService.getAll().subscribe((data) => {
      this.response = data;
      console.log(this.response)
    });
    
  }

  delete($event: MouseEvent,id: number) {
    $event.stopPropagation();
    if(confirm("¿Do you want to delete this record?")){
      this.professionService.delete(id).subscribe(() => {
        this.load();
      });
    }
  }
}
