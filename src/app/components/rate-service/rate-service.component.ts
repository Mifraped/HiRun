import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Business } from 'src/app/models/business';
import { Rate } from 'src/app/models/rate';
import { ResponseBusiness } from 'src/app/models/response-business';
import { ResponseRates } from 'src/app/models/response-rates';
import { ResponseService } from 'src/app/models/response-service';
import { ResponseUser } from 'src/app/models/response-user';
import { Service } from 'src/app/models/service';
import { User } from 'src/app/models/user';
import { BusinessService } from 'src/app/shared/business.service';
import { RatingService } from 'src/app/shared/rating.service';
import { ServiceService } from 'src/app/shared/service.service';
import { UserService } from 'src/app/shared/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-rate-service',
  templateUrl: './rate-service.component.html',
  styleUrls: ['./rate-service.component.css']
})
export class RateServiceComponent implements OnInit{
  stars = Array(5).fill({ isSolid: false }).map((_, index) => ({ isSolid: false, index }))

  selectedStarIndex: number =-1;

  commentContent:string=''

  @Input() ratingWindowOpen: boolean
  @Input() id_service:number
  @Input() id_business:number
  @Input() id_provider:number
  @Output()ratingWindowOpenChange = new EventEmitter<boolean>();

  constructor(public businessService:BusinessService, public serviceService:ServiceService, public userService:UserService, public ratingService:RatingService){}

  business:Business
  service:Service
  serviceProvider:User
  user:User
  ratingExists:boolean=false
  rateId:number |null = null

  fillStars(index: number): void {
    console.log(index)
    // Elimina la clase fa-solid de todas las estrellas
    this.stars.forEach((star, i) => {
     
      star.isSolid = i <= index;
    });
    this.selectedStarIndex = index;
    
  }

  


  async sendRating(){
    this.ratingService.checkIfRatingExists(this.user.id_user, this.service.id_service).subscribe((res:ResponseRates)=>{
      if (res.error){
        console.log('error')
        alert('Error: '+ res.error)
      }else{
        this.ratingExists=(res.data.length!==0)
        this.rateId=(res.data[0].id_rate)

        const rate = new Rate (this.user.id_user, this.service.id_service, this.selectedStarIndex +1,this.commentContent, this.rateId )
        //si no existe se crea
        if (!this.ratingExists){
          console.log('hola')
          console.log(rate)
          this.ratingService.postRating(rate).subscribe((res:ResponseRates)=>{
            if (res.error){
              console.log('error')
              alert('Error: '+ res.error)
            }else{
              Swal.fire({        
                title: "Reseña enviada",
                text: "Tu valoración se ha enviado correctamente.",
                icon: "success",          
                confirmButtonColor: "var(--green)",
                confirmButtonText: "OK",
              })
            }
          })
         //si ya existe se actualiza
        }else{
          this.ratingService.putRating(rate).subscribe((res:ResponseRates)=>{
            if (res.error){
              console.log('error')
              alert('Error: '+ res.error)
            }else{
              Swal.fire({        
                title: "Reseña modificada",
                text: "Tu valoración para este servicio ha sido actualizada",
                icon: "success",          
                confirmButtonColor: "var(--green)",
                confirmButtonText: "OK",
              })
            }
          })
        }
      }})
      this.ratingWindowOpen = false;
      this.ratingWindowOpenChange.emit(this.ratingWindowOpen); 
    }

  cancel() {
    this.ratingWindowOpen = false;
    this.ratingWindowOpenChange.emit(this.ratingWindowOpen); 
  }


  ngOnInit(){
    //info negocio
    this.businessService.getBusinessById(this.id_business).subscribe((res:ResponseBusiness)=>{
      if (res.error){
        console.log("error")
        alert(res.error)
      }else{
        this.business=res.data[0]
      }
    })
    //info servicio
    this.serviceService.getOneService(this.id_service).subscribe((res:ResponseService)=>{
      if (res.error){
        console.log("error")
        alert(res.error)
      }else{
        this.service=res.data[0]
      }
    })
    //info proveedor
    this.userService.getUserInfo(this.id_provider).subscribe((res:ResponseUser)=>{
      if (res.error){
        console.log("error")
        alert(res.error)
      }else{
        this.serviceProvider=res.data[0]
      }
    })
    //info usuario 
    this.user = this.userService.user
  }

}
