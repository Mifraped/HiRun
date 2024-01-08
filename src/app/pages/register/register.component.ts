import { Component } from '@angular/core';
import { Category } from 'src/app/models/category';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/user.service';
import { HeaderNavbarService } from 'src/app/shared/header-navbar.service';
import { ResponseUser } from 'src/app/models/response-user';
import { CategoryService } from 'src/app/shared/category.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private router: Router, public userService: UserService, public headerNavbarService: HeaderNavbarService, private categoryService: CategoryService) { 
    this.userService.user=null
    this.headerNavbarService.showHeader=false
    this.headerNavbarService.showNavbar=false}

newUser : User 

id_user: number;
email:string;
password: string;
name: string;
surname:string;
location: string;
phoneNumber: number;
photo: string;
company: string;
preferences: Category [] = []


showForm1:boolean = true
showForm2:boolean = false
showForm3:boolean = false


//imagen de perfil por defecto
defaultProfilePic='assets/profile_img/default_picture.jpg'


  registerInfo({email, password, passwordRepeat}){
    this.email = email
    this.password = password
    this.showForm1 = false
    this.showForm2 = true
    
  }
  
  registerUser(newUser:User){
    
    this.userService.postUser(newUser).subscribe((res:ResponseUser)=>{
      console.log(res)
      if (res.error){
        alert(res.error)
      }else{
        alert('usuario creado')
        this.userService.user=null
        this.id_user = res.data.id_user        
      }
    })
  }
  registerInfoNext({name, surname, location, phoneNumber, company}){
    this.name = name
    this.surname = surname
    this.location = location
    this.phoneNumber = phoneNumber
    this.company = company
    this.showForm2 = false
    this.showForm3 = true

    this.newUser = {
    email: this.email,
    password: this.password,
    name: this.name,
    surname: this.surname,
    location: this.location,
    phoneNumber: this.phoneNumber,
    photo: this.defaultProfilePic,
    company: this.company,
    }
    console.log('paso2')
    //aquí habría que hacer el POST new User cuando conectemos con la bbdd
    this.registerUser(this.newUser)
     
    }


    registerPreferences(catArray){
      // this.newUser.preferences=catArray
      // aquí actualizar el usuario (PUT), falta que si hay login coja el id
      this.categoryService.postPreferences(catArray,this.id_user).subscribe((res:ResponseUser) => {
        
      })

      console.log(this.newUser)
      
      this.router.navigate(['/login'])
    }

   
   
  



}
