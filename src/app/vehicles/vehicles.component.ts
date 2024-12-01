import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehicleService } from '../../Services/vehicle.service';
import { ApiResponse } from '../../Models/api-response.model';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-vehicles',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl:'./vehicles.component.html',
  styleUrl: './vehicles.component.css'
})
export class VehiclesComponent {
  response: ApiResponse | undefined;

  constructor(private vehiclesService: VehicleService) {
    this.load();
  }

  load() {
    this.vehiclesService.getAll().subscribe((data) => {
      this.response = data;
      console.log(this.response)
    });
    
  }

  delete($event: MouseEvent,id: number) {
    $event.stopPropagation();
    if(confirm("¿Do you want to delete this record?")){
      this.vehiclesService.delete(id).subscribe(() => {
        this.load();
      });
    }
  }
}
