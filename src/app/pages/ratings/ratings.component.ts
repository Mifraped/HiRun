import { Component } from '@angular/core';
import { HeaderNavbarService } from 'src/app/shared/header-navbar.service';

@Component({
  selector: 'app-ratings',
  templateUrl: './ratings.component.html',
  styleUrls: ['./ratings.component.css']
})
export class RatingsComponent {
constructor(public headerNavbarService: HeaderNavbarService) { 
  this.headerNavbarService.showHeader=false
  this.headerNavbarService.showNavbar=true}
}
