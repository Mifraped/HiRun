import { Component, Input, OnInit } from '@angular/core';
import { BusinessService } from 'src/app/shared/business.service';
import { Router } from '@angular/router';
import { Business } from 'src/app/models/business';
import { Service} from 'src/app/models/service';
import { RequestedService } from 'src/app/models/requested-service';


@Component({
  selector: 'app-profile-business-card',
  templateUrl: './profile-business-card.component.html',
  styleUrls: ['./profile-business-card.component.css']
})
export class ProfileBusinessCardComponent {

  @Input() negocioPadre: Business
  @Input() servicePadre: RequestedService


  public page: string
  public status: string

    ngOnInit(){
      this.status = this.servicePadre.canceled == 0 ? "Pendiente" : "Cancelado"
    }


  public cambioFecha(date: string){
    let newDate = new Date(date)
    let formatOptions = {day: 'numeric', month: 'long'} as Intl.DateTimeFormatOptions
    return new Intl.DateTimeFormat('es-ES', formatOptions).format(newDate)
  }

  public changePage(){
    if(this.router.url.includes("/service-provided")) this.page = 'activos'
    else if(this.router.url.includes("/requested-service")) this.page = 'solicitados'
  }

  constructor(public businessService: BusinessService, public router: Router){

    this.changePage()

  }
}
