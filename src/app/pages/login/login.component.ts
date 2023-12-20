import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { NgForm } from '@angular/forms'
import { HeaderNavbarService } from 'src/app/shared/header-navbar.service';
import { HttpClient } from '@angular/common/http';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public user: User = new User(null, null, null, null, null, null, null)

  public sendForm(form:NgForm){
    console.log(this.user);
    
    this.userService.login(this.user).subscribe((data:any) => {
      if(data){
        this.userService.logueado = true
        this.userService.user = data.data
      }
      else {
        this.userService.logueado = true
        console.log("Error")
      }
    })
  }

  constructor(public headerNavbarService: HeaderNavbarService, private userService: UserService) { 
    this.headerNavbarService.showHeader=false
    this.headerNavbarService.showNavbar=false}

}
