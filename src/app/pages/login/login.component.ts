import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { NgForm } from '@angular/forms'
import { HeaderNavbarService } from 'src/app/shared/header-navbar.service';
import { HttpClient } from '@angular/common/http';
import { UserService } from 'src/app/shared/user.service';
import { ResponseUser } from 'src/app/models/response-user';
import { Router } from '@angular/router';
import { ResponseRates } from 'src/app/models/response-rates';
import Swal from 'sweetalert2'
import {Location} from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(public headerNavbarService: HeaderNavbarService, private userService: UserService, private ruter: Router, private _location:Location) { 
    this.headerNavbarService.showHeader=false
    this.headerNavbarService.showNavbar=false}

  public user: User = new User(null, null, null, null, null, null, null)

  goBack(){
    this._location.back();
  }

  public sendForm(form:NgForm){

   
    this.userService.login(this.user).subscribe((resp:ResponseUser) => {
      if(resp.error == false){
        this.userService.connected = true
        this.userService.user = new User(resp.data.email, null, resp.data.name, resp.data.surname, resp.data.location, resp.data.phoneNumber, resp.data.photo, null, resp.data.company, resp.data.id_user,resp.data.rate)
        this.ruter.navigate(["home"])        
      }
      else {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Email o contraseña incorrectos",
          showConfirmButton: false,
          timer: 1500
        });
      }
    })
  }

}
