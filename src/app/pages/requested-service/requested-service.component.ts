import { Component } from '@angular/core';
import { Business } from 'src/app/models/business';
import { BusinessService } from 'src/app/shared/business.service';
import { HeaderNavbarService } from 'src/app/shared/header-navbar.service';

@Component({
  selector: 'app-requested-service',
  templateUrl: './requested-service.component.html',
  styleUrls: ['./requested-service.component.css'],
})
export class RequestedServiceComponent {
  constructor(
    public headerNavbarService: HeaderNavbarService,
    public businessService: BusinessService
  ) {
    this.headerNavbarService.showHeader = false;
    this.headerNavbarService.showNavbar = true;
  }
}
