import { Component } from '@angular/core';
import { Business } from 'src/app/models/business';
import { BusinessService } from 'src/app/shared/business.service';
import { HeaderNavbarService } from 'src/app/shared/header-navbar.service';
import { ResponseBusiness } from 'src/app/models/response-business';
import {Location} from '@angular/common';

@Component({
  selector: 'app-business-provided',
  templateUrl: './service-provided.component.html',
  styleUrls: ['./service-provided.component.css'],
})
export class ServiceProvidedComponent {
  constructor(
    public businessService: BusinessService,
    public headerNavbarService: HeaderNavbarService,
    private _location:Location
  ) {
    this.headerNavbarService.showHeader = false;
    this.headerNavbarService.showNavbar = true;
  }

  goBack(){
    this._location.back();
  }
  ngOnInit(): void {
    this.businessService.getBusiness().subscribe((resp: ResponseBusiness) => {
      this.businessService.logedUserBusinesses = resp.data
    })
  }
}
