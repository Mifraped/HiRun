import { Component, Input } from '@angular/core';
import { ServiceService } from 'src/app/shared/service.service';
import { Router } from '@angular/router';
import { Service } from 'src/app/models/service';
import { Job } from 'src/app/models/job';

@Component({
  selector: 'app-profile-service-card',
  templateUrl: './profile-service-card.component.html',
  styleUrls: ['./profile-service-card.component.css']
})
export class ProfileServiceCardComponent {

  @Input() servicioPadre: Service
  @Input() jobPadre: Job

  public page: string
  public status: string = "Pendiente"

  public changePage(){
    if(this.router.url.includes("/service-provided")) this.page = 'activos'
    else if(this.router.url.includes("/requested-service")) this.page = 'solicitados'
  }

  constructor(public serviceService: ServiceService, public router: Router){

    this.changePage()

  }
}
