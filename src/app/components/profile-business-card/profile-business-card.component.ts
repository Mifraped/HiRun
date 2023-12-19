import { Component, Input } from '@angular/core';
import { BusinessService } from 'src/app/shared/business.service';
import { Router } from '@angular/router';
import { Business } from 'src/app/models/business';
import { Service} from 'src/app/models/service';

@Component({
  selector: 'app-profile-business-card',
  templateUrl: './profile-business-card.component.html',
  styleUrls: ['./profile-business-card.component.css']
})
export class ProfileBusinessCardComponent {

  @Input() negocioPadre: Business
  @Input() servicePadre: Service

  public page: string
  public status: string = "Pendiente"

  public changePage(){
    if(this.router.url.includes("/service-provided")) this.page = 'activos'
    else if(this.router.url.includes("/requested-service")) this.page = 'solicitados'
  }

  constructor(public businessService: BusinessService, public router: Router){

    this.changePage()

  }
}
