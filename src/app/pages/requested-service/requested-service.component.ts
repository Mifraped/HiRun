import { Component } from '@angular/core';
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
}
