import { Component, Input, OnInit } from '@angular/core';
import { BusinessService } from 'src/app/shared/business.service';
import { Router } from '@angular/router';
import { Business } from 'src/app/models/business';
import { Service} from 'src/app/models/service';
import { RequestedService } from 'src/app/models/requested-service';
import { ImageService } from 'src/app/shared/image.service';


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
  imageUrl:string

  goToBusinessEdit() {
    console.log(this.negocioPadre);
        this.router.navigate(['/edit-business', this.negocioPadre.id_business]);
}

getImageUrl(imageName: string): string {
  return `${this.imageService.serverUrl}${imageName}`;
}

  ngOnInit() {
    if (this.servicePadre && typeof this.servicePadre.canceled !== 'undefined') {
      this.status = this.servicePadre.canceled === 0 ? "Pendiente" : "Cancelado";
    } else {
      this.status = "Estado no disponible";
    }
    this.imageUrl=this.negocioPadre.photo
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

  constructor(public businessService: BusinessService, public router: Router, public imageService: ImageService){

    this.changePage()

  }
}
