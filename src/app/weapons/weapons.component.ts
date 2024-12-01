import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeaponService } from '../../Services/weapon.service';
import { ApiResponse } from '../../Models/api-response.model';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-weapons',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl : './weapons.component.html',
  styleUrl: './weapons.component.css'
})
export class WeaponsComponent {
  response: ApiResponse | undefined;

  constructor(private weaponService: WeaponService) {
    this.load();
  }

  load() {
    this.weaponService.getAll().subscribe((data) => {
      this.response = data;
      console.log(this.response)
    });
    
  }

  delete($event: MouseEvent,id: number) {
    $event.stopPropagation();
    if(confirm("¿Do you want to delete this record?")){
      this.weaponService.delete(id).subscribe(() => {
        this.load();
      });
    }
  }
}
