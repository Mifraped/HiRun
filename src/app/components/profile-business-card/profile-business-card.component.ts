import { Component, Input, OnInit } from '@angular/core';
import { BusinessService } from 'src/app/shared/business.service';
import { Router } from '@angular/router';
import { Business } from 'src/app/models/business';
import { Service} from 'src/app/models/service';
import { RequestedService } from 'src/app/models/requested-service';
import { ImageService } from 'src/app/shared/image.service';
import { UserService } from 'src/app/shared/user.service';
import { RatingService } from 'src/app/shared/rating.service';
import { ResponseRates } from 'src/app/models/response-rates';


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

  businessRating:number

  isMyBusiness:boolean =false
  busProvider:number
  fotoNegocio: any;

  goToBusinessEdit() {
        this.router.navigate([`/edit-business/${this.negocioPadre.id_business}`]);
}

  round(number:number){
    let decimal = number - Math.floor(number)
    if (decimal >= 0.5) return Math.ceil(number)
    else return Math.floor(number)
  }


  ngOnInit() {
    

    if (this.servicePadre && typeof this.servicePadre.canceled !== 'undefined') {
      // this.status = this.servicePadre.canceled === 0 ? "Pendiente" : "Cancelado";
      if (this.servicePadre.canceled){
        this.status='Cancelado'
      }else if (new Date (this.servicePadre.date) < new Date()){
        this.status='Completado'
      }else{
        this.status='Pendiente'
      }


    } else {
      this.status = "Estado no disponible";
    }
    this.imageUrl= this.negocioPadre && this.negocioPadre.photo ? this.negocioPadre.photo : null;

    if (this.negocioPadre){

      if (this.negocioPadre.photo&&this.negocioPadre.photo!=''){
        this.fotoNegocio=this.negocioPadre.photo
      }else{
        this.fotoNegocio='../../../assets/img/logo_business_home.png'
      }
      this.busProvider=this.negocioPadre.id_business
      this.ratingService.getAvgBusinessRates(this.negocioPadre.id_business).subscribe((res: ResponseRates)=>{
        if (res.error){
          alert('error')
        }else{
          this.businessRating=this.round(res.data[0].rate)          
        }
      })

      if (this.userService.connected && this.negocioPadre.provider===this.userService.user?.id_user){        
        this.isMyBusiness=true        
      }else{    
        this.isMyBusiness=false
      }
  }}


  public cambioFecha(date: string){
    let newDate = new Date(date)
    let formatOptions = {day: 'numeric', month: 'long'} as Intl.DateTimeFormatOptions
    return new Intl.DateTimeFormat('es-ES', formatOptions).format(newDate)
  }

  public changePage(){
    if(this.router.url.includes("/service-provided")) this.page = 'activos'
    else if(this.router.url.includes("/requested-service")) this.page = 'solicitados'
  }

  constructor(public businessService: BusinessService, public router: Router, public ratingService: RatingService, public userService:UserService){

    this.changePage()

  }
}
