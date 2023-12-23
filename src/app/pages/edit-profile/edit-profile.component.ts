import { Component } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { HeaderNavbarService } from 'src/app/shared/header-navbar.service';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/models/user';
import { ResponseUser } from 'src/app/models/response-user';
import Swal from 'sweetalert2'

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

  public sendForm(form:NgForm){
  this.userService.putUser(this.userService.user).subscribe((resp: ResponseUser) => {
    if(resp.error == false){
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Perfil actualizado",
        showConfirmButton: false,
        timer: 1500
      });
    }else{
      this.userService.user.name = resp.data.name
      this.userService.user.surname = resp.data.surname
      this.userService.user.location = resp.data.location
      this.userService.user.phoneNumber = resp.data.phoneNumber
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "No se pudo actualizar el perfil",
        showConfirmButton: false,
        timer: 1500
      });
    }
  })    
  }
}
