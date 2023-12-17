import { Component } from '@angular/core';
import { Service } from 'src/app/models/service';
import { ServiceService } from 'src/app/shared/service.service';
import { HeaderNavbarService } from 'src/app/shared/header-navbar.service';

@Component({
  selector: 'app-service-provided',
  templateUrl: './service-provided.component.html',
  styleUrls: ['./service-provided.component.css'],
})
export class ServiceProvidedComponent {
  constructor(
    public serviceService: ServiceService,
    public headerNavbarService: HeaderNavbarService
  ) {
    this.headerNavbarService.showHeader = false;
    this.headerNavbarService.showNavbar = true;
  }
}
