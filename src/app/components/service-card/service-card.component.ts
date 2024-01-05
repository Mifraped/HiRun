import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Business } from 'src/app/models/business';
import { ResponseBusOpt } from 'src/app/models/response-bus-opt';
import { ResponseTimeframe } from 'src/app/models/response-timeframe';
import { TimeFrame } from 'src/app/models/time-frame';
import { OptionService } from 'src/app/shared/option.service';
import { TimeframeService } from 'src/app/shared/timeframe.service';
import { UserService } from 'src/app/shared/user.service';
import Swal from 'sweetalert2';
import { BusinessOpt } from 'src/app/models/business-opt';


@Component({
  selector: 'app-service-card',
  templateUrl: './service-card.component.html',
  styleUrls: ['./service-card.component.css']
})
export class ServiceCardComponent implements OnInit{
@Input() service:any
@Input() business:Business


tf: TimeFrame[]

bookService(){  
  this.timeframeService.getBusinessTimeframe(this.business.id_business).subscribe((res:ResponseTimeframe)=>{
    if (res.error){
      console.log('error')
      alert(res.error)
    }else{    
      this.tf=res.data
    
 
  if (this.tf.length===0){
    Swal.fire({        
      title: "No se puede reservar cita",
      text: "Contacta con el vendedor para concretar fecha y hora de tu reserva.",
      icon: "warning",
      showCancelButton: true,
      
      confirmButtonColor: "var(--green)",
      cancelButtonColor: "var(--red)",
      confirmButtonText: "Contactar",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed && this.userService.connected) {
        this.router.navigate(['/chat'])

      }else if (!this.userService.connected){
        Swal.fire({        
          title: "Inicia sesión",
          text: "Debes iniciar sesión para ponerte en contacto con el vendedor",
          icon: "warning",
          showCancelButton: true,          
          confirmButtonColor: "var(--green)",
          cancelButtonColor: "var(--red)",
          confirmButtonText: "Iniciar sesión",
          cancelButtonText: "Cancelar"
        }).then((result)=>{
          if (result.isConfirmed) {
            this.router.navigate(['/login'])
          }
        })


       }
    })}else if (this.userService.connected){
        console.log(this.business.id_business)
        console.log(this.service.id_service)
      this.router.navigate(['/book-service',this.business.id_business, this.service.id_service]);
       
      }else{
        Swal.fire({        
          title: "Inicia sesión",
          text: "Debes iniciar sesión para reservar un servicio",
          icon: "warning",
          showCancelButton: true,          
          confirmButtonColor: "var(--green)",
          cancelButtonColor: "var(--red)",
          confirmButtonText: "Iniciar sesión",
          cancelButtonText: "Cancelar"
        }).then((result)=>{
          if (result.isConfirmed) {
            this.router.navigate(['/login'])
          }
        })
      }
    }

    
  })

}

cardExtended:boolean = false

initialOptions:BusinessOpt[] = []

opt1 ={selected:false, icon:'fa-solid fa-house', i:1}
  opt2 ={selected:false, icon:'fa-solid fa-laptop', i:2}
  opt3 ={selected:false, icon:'fa-regular fa-credit-card', i:3}
  opt4 ={selected:false, icon:'fa-solid fa-coins', i:4}

  allOptions = [this.opt1, this.opt2, this.opt3, this.opt4];
  selectedOptions:number[] = []

expandInfo(){
  this.cardExtended=!this.cardExtended
  
}
constructor(private router: Router, private userService:UserService, public timeframeService: TimeframeService, private optionsService:OptionService) { }

ngOnInit(){
  this.optionsService.getBusinessOpt(this.business.id_business).subscribe((res:ResponseBusOpt)=>{
    if (res.error){
      console.log('error')
      alert(res.error)
    }else{    
      for  (let i=0; i<res.data.length;i++){         
        this.initialOptions.push(res.data[i])
        this.selectedOptions.push(res.data[i].id_options-1)
        
      }
      console.log(this.initialOptions)
      console.log(this.selectedOptions)
    }
  })
  
 

  
}
}