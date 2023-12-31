import { Component,ViewChild } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { HeaderNavbarService } from 'src/app/shared/header-navbar.service';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/models/user';
import { ResponseUser } from 'src/app/models/response-user';
import Swal from 'sweetalert2'
import { ResponsePhoto } from 'src/app/models/response-photo';
import * as e from 'express';
import { PhotoService } from 'src/app/shared/photo.service';


@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent {

  @ViewChild('formUser') form: NgForm

  public name = this.userService.user.name
  public surname = this.userService.user.surname
  public location = this.userService.user.location
  public phoneNumber = this.userService.user.phoneNumber

  public fileToUpload: File = null;
  public imagePreview: string;

  public isUpdating = false

  constructor(public userService: UserService, public headerNavbarService: HeaderNavbarService, private photoService: PhotoService) { 
    this.headerNavbarService.showHeader=false
    this.headerNavbarService.showNavbar=true
  }

  onFileSelected(event) {
    if (event.target.files && event.target.files[0]) {
      this.fileToUpload = event.target.files[0];
  
      const reader = new FileReader();
      reader.onload = e => this.imagePreview = reader.result as string;
  
      reader.readAsDataURL(this.fileToUpload);
    }
  }

  private setUser(){
    this.userService.user.name = this.name
    this.userService.user.surname = this.surname
    this.userService.user.location = this.location
    this.userService.user.phoneNumber = this.phoneNumber
  }

  private updateUser(){
    this.isUpdating = true
    if(this.form.dirty){
      this.setUser()
    }
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
        this.userService.user.photo = resp.data.photo
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "No se pudo actualizar el perfil",
          showConfirmButton: false,
          timer: 1500
        });
      }
      this.isUpdating = false
    })
  }

  public sendForm(){
    this.isUpdating = true
    if(this.fileToUpload){
      const formData = new FormData();
      formData.append('photo', this.fileToUpload, this.fileToUpload.name);
      this.photoService.uploadPhoto(formData).subscribe((resp: ResponsePhoto) => {
        if(resp.error == false){
          this.userService.user.photo = resp.data
          this.updateUser()
        }else{
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: "No se pudo actualizar el perfil",
            showConfirmButton: false,
            timer: 1500
          });
          this.isUpdating = false
        }
    })
    this.fileToUpload = null
    }else this.updateUser()
  }
}
