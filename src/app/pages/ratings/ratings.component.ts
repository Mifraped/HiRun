import { Component } from '@angular/core';
import { HeaderNavbarService } from 'src/app/shared/header-navbar.service';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-ratings',
  templateUrl: './ratings.component.html',
  styleUrls: ['./ratings.component.css']
})
export class RatingsComponent {

  public rating: number = 4
constructor(public headerNavbarService: HeaderNavbarService, public userService: UserService) { 
  this.headerNavbarService.showHeader=false
  this.headerNavbarService.showNavbar=true}
}
