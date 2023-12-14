import { Component } from '@angular/core';
import { ServiceService } from 'src/app/shared/service.service';

@Component({
  selector: 'app-profile-service-card',
  templateUrl: './profile-service-card.component.html',
  styleUrls: ['./profile-service-card.component.css']
})
export class ProfileServiceCardComponent {

  public page: string = "solicitados"
  // public page: string = "activos"
  public status: string = "Pendiente"

  constructor(public serviceService: ServiceService){}
}
