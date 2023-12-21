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

@Component({
  selector: 'app-business',
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.css']
})
export class BusinessComponent {



// business = this.businessService.business
business:Business

services: Service[]

providerId:number
provider:User
name:string
surname:string
userPic:string



constructor(public userService:UserService, public businessService:BusinessService, private router:Router,public headerNavbarService: HeaderNavbarService,private route: ActivatedRoute) { 
  this.headerNavbarService.showHeader=true
  this.headerNavbarService.showNavbar=true }

contactProvider(){

  if (this.userService.connected){

    this.router.navigate(['/chat'])
  }else{
    alert('inicia sesión para contactar con el vendedor')
    this.router.navigate(['/login'])
  }
  //pendiente lógica, tiene que llevarte a chat con el usuario business.provider
}

ngOnInit(): void {
  const id = this.route.snapshot.paramMap.get('id_business');
  
const data=this.businessService.getBusinessById(id).subscribe((res:ResponseBusiness)=>{
  
  if (res.error){
    console.log('error')
    alert(res.error)
  }else{
    console.log(res.data)
    return res.data
  }
})

this.business=data[0]




}



}
