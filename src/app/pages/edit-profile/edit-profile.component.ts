import { Component } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { HeaderNavbarService } from 'src/app/shared/header-navbar.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent {

  constructor(public userService: UserService, public headerNavbarService: HeaderNavbarService) { 
    this.headerNavbarService.showHeader=false
    this.headerNavbarService.showNavbar=true
    
  }
}
