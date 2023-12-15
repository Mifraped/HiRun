import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { NgForm } from '@angular/forms'
import { HeaderNavbarService } from 'src/app/shared/header-navbar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public user: User

  public sendForm(form:NgForm){
    console.log(this.user);
  }

  constructor(public headerNavbarService: HeaderNavbarService) { 
    this.headerNavbarService.showHeader=false
    this.headerNavbarService.showNavbar=false}

}
