import { Component } from '@angular/core';
import { Business } from 'src/app/models/business';
import { BusinessService } from 'src/app/shared/business.service';
import { HeaderNavbarService } from 'src/app/shared/header-navbar.service';
import { ResponseBusiness } from 'src/app/models/response-business';

@Component({
  selector: 'app-business-provided',
  templateUrl: './service-provided.component.html',
  styleUrls: ['./service-provided.component.css'],
})
export class ServiceProvidedComponent {
  constructor(
    public businessService: BusinessService,
    public headerNavbarService: HeaderNavbarService
  ) {
    this.headerNavbarService.showHeader = false;
    this.headerNavbarService.showNavbar = true;
  }

  ngOnInit(): void {
    this.businessService.getBusiness().subscribe((resp: ResponseBusiness) => {
      this.businessService.logedUserBusinesses = resp.data
    })
  }
}
