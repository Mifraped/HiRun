import { Component } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { Router } from '@angular/router';
import { HeaderNavbarService } from 'src/app/shared/header-navbar.service';

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.css']
})
export class PreferencesComponent {
  constructor(private router: Router,public userService:UserService, public headerNavbarService: HeaderNavbarService) { 
    this.headerNavbarService.showHeader=false
    this.headerNavbarService.showNavbar=false}

  login:string='/login'
  register:string='/register'

  connected:boolean = this.userService.connected
user = this.userService.user


  registerPreferences(catArray){
    // this.user.preferences=catArray
    // aquí actualizar el usuario (PUT), falta que si hay login coja el id
    
    this.router.navigate(['/profile']) 
  }

}
