import { Component } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { Router } from '@angular/router';
import { HeaderNavbarService } from 'src/app/shared/header-navbar.service';
import { ResponseCategory } from 'src/app/models/response-category';
import { CategoryService } from 'src/app/shared/category.service';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.css']
})
export class PreferencesComponent {
  constructor(private router: Router,public userService:UserService, public headerNavbarService: HeaderNavbarService, private categoryService: CategoryService) { 
    this.headerNavbarService.showHeader=false
    this.headerNavbarService.showNavbar=false}

  login:string='/login'
  register:string='/register'

  connected:boolean = this.userService.connected
user = this.userService.user


  registerPreferences(catArray){
    console.log(catArray);
    
    this.categoryService.putPreferences(catArray).subscribe((res:ResponseCategory) => {
      if(res.error == false){
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Preferencias actualizadas",
          showConfirmButton: false,
          timer: 1500
        });
      }else{
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Error al actualizar preferencias",
          showConfirmButton: false,
          timer: 1500
        });
      }
    })
    // this.user.preferences=catArray
    // aquí actualizar el usuario (PUT), falta que si hay login coja el id
    
    this.router.navigate(['/edit-profile']) 
  }

}
