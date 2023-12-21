import { Component } from '@angular/core';
import { Business } from 'src/app/models/business';
import { UserService } from 'src/app/shared/user.service';
import { BusinessService } from 'src/app/shared/business.service';
import { Router } from '@angular/router';
import { HeaderNavbarService } from 'src/app/shared/header-navbar.service';
import { ActivatedRoute } from '@angular/router';
import { ResponseBusiness } from 'src/app/models/response-business';
import { Service } from 'src/app/models/service';
import { User } from 'src/app/models/user';
import { ServiceService } from 'src/app/shared/service.service';
import { ResponseService } from 'src/app/models/response-service';
import { ResponseUser } from 'src/app/models/response-user';

@Component({
  selector: 'app-business',
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.css']
})
export class BusinessComponent {

business:Business

services: Service[]

provider: User
providerId: number

constructor(public userService:UserService, public businessService:BusinessService, private router:Router,public headerNavbarService: HeaderNavbarService,private route: ActivatedRoute, public serviceService:ServiceService) { 
  this.headerNavbarService.showHeader=true
  this.headerNavbarService.showNavbar=true }

contactProvider(){ 

  if (this.userService.connected){

    this.router.navigate(['/chat'])
  }else{
    alert('inicia sesión para contactar con el vendedor')
    this.router.navigate(['/login'])
  }
  // pendiente lógica, tiene que llevarte a chat con el usuario business.provider
}

ngOnInit() {
  const id = this.route.snapshot.paramMap.get('id_business');
  
  this.businessService.getBusinessById(+id).subscribe((res:ResponseBusiness)=>{
    
    if (res.error){
      console.log('error')
      alert(res.error)
    }else{    
      this.business=res.data[0]
      this.providerId=res.data[0].provider

      this.userService.getUserInfo(this.providerId).subscribe((res:ResponseUser)=>{
        
        if (res.error){
          console.log('error')
          alert(res.error)
        }else{    
          this.provider=res.data[0]
         
        }
      })
      
    }
  })

  this.serviceService.getAllServices(+id).subscribe((res:ResponseService)=>{
    
    if (res.error){
      console.log('error')
      alert(res.error)
    }else{    
      this.services=res.data
    }
    
  })

  
}



}
