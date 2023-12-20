import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { NgForm } from '@angular/forms'
import { HeaderNavbarService } from 'src/app/shared/header-navbar.service';
import { HttpClient } from '@angular/common/http';
import { UserService } from 'src/app/shared/user.service';
import { ResponseUser } from 'src/app/models/response-user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(public headerNavbarService: HeaderNavbarService, private userService: UserService, private ruter: Router) { 
    this.headerNavbarService.showHeader=false
    this.headerNavbarService.showNavbar=false}

  public user: User = new User(null, null, null, null, null, null, null)

  public sendForm(form:NgForm){

    
    this.userService.login(this.user).subscribe((resp:ResponseUser) => {
      if(resp.error == false){
        this.userService.connected = true
        this.userService.user = resp.data
        this.ruter.navigate(["home"])   
        console.log(this.userService.user);
        
      }
      else {
        console.log("Error")
        alert(resp.message)
      }
    })
  }

}
