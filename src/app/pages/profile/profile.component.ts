import { Component } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { HeaderNavbarService } from 'src/app/shared/header-navbar.service';
import { Router } from '@angular/router';
import { ResponseRates } from 'src/app/models/response-rates';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  constructor(public userService: UserService, public headerNavbarService: HeaderNavbarService, private router: Router) { 
    this.headerNavbarService.showHeader=false
    this.headerNavbarService.showNavbar=true }

    public logOut(){
      this.userService.connected = false
      this.router.navigate(["/home"])
    }

    public getRates(){
      this.userService.getRates().subscribe((resp:ResponseRates) => {
        this.userService.rates = resp.data
      })
    }
}
