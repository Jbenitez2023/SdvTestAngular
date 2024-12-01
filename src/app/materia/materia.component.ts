import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MateriaService } from '../../Services/Materia.service';
import { ApiResponse } from '../../Models/api-response.model';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-materia',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl:  './materia.component.html',
  styleUrl: './materia.component.css'
})
export class MateriaComponent {
  materia: ApiResponse | undefined;

  constructor(private materiaService: MateriaService) {
    this.loadmateria();
  }

  loadmateria() {
    this.materiaService.getAll().subscribe((data) => {
      this.materia = data;
      console.log(this.materia)
    });
    
  }

  delete($event: MouseEvent,id: number) {
    $event.stopPropagation();
    if(confirm("¿Do you want to delete this record?")){
      this.materiaService.delete(id).subscribe(() => {
        this.loadmateria();
      });
    }
  }
}
