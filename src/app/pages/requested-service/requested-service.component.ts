import { Component } from '@angular/core';
import { Service } from 'src/app/models/service';
import { ServiceService } from 'src/app/shared/service.service';
import { HeaderNavbarService } from 'src/app/shared/header-navbar.service';

@Component({
  selector: 'app-requested-service',
  templateUrl: './requested-service.component.html',
  styleUrls: ['./requested-service.component.css']
})
export class RequestedServiceComponent {
constructor(public headerNavbarService: HeaderNavbarService) { 
  this.headerNavbarService.showHeader=false
  this.headerNavbarService.showNavbar=true}

  constructor(public serviceService: ServiceService){

  }
}
