import { Component } from '@angular/core';
import { Business } from 'src/app/models/business';
import { UserService } from 'src/app/shared/user.service';
import { BusinessService } from 'src/app/shared/business.service';
import { Router } from '@angular/router';
import { HeaderNavbarService } from 'src/app/shared/header-navbar.service';

@Component({
  selector: 'app-business',
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.css']
})
export class BusinessComponent {

business = this.businessService.business

services= this.business.services

constructor(public userService:UserService, public businessService:BusinessService, private router:Router,public headerNavbarService: HeaderNavbarService) { 
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


}
