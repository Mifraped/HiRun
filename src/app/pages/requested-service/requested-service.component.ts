import { Component } from '@angular/core';
import { Business } from 'src/app/models/business';
import { BusinessService } from 'src/app/shared/business.service';
import { HeaderNavbarService } from 'src/app/shared/header-navbar.service';
import { UserService } from 'src/app/shared/user.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-requested-service',
  templateUrl: './requested-service.component.html',
  styleUrls: ['./requested-service.component.css'],
})
export class RequestedServiceComponent {
  constructor(
    public headerNavbarService: HeaderNavbarService,
    public businessService: BusinessService,
    public userService: UserService,
    private _location:Location
  ) {
    this.headerNavbarService.showHeader = false;
    this.headerNavbarService.showNavbar = true;
  }

  goBack(){
    this._location.back();
  }
}
