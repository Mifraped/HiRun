import { Component, EventEmitter, Output } from '@angular/core';
import { Category } from 'src/app/models/category';
import { UserService } from 'src/app/shared/user.service';
import { ServiceService } from 'src/app/shared/service.service';

@Component({
  selector: 'app-reg-form3',
  templateUrl: './reg-form3.component.html',
  styleUrls: ['./reg-form3.component.css']
})
export class RegForm3Component {
  
  @Output() registerPartThree = new EventEmitter<any>();
  @Output() registerPartThreeLoggedIn = new EventEmitter<any>();
  constructor(public userService:UserService, public serviceService: ServiceService){}
  
  //para enlazar los a
  login = '/login' 
  profile = '/profile'


  allCat = this.serviceService.allCat
  
  selectedCat = []

  connected:boolean = this.userService.connected

  user = this.userService.user

//mueve las categorías entre el array de seleccionadas (selectedCat) y el listado general (allCat)
  swap(index: number, action:string): void {
    
    let currentCat
    if (action=='add'){

       currentCat = this.allCat[index];
    }else{
       currentCat = this.selectedCat[index]
    }
    console.log(index)

    if (this.allCat.includes(currentCat)) {
      this.allCat.splice(index, 1);
      this.selectedCat.push(currentCat);
    } else {
      this.selectedCat.splice(index, 1);
      this.allCat.push(currentCat);
    }

  }

  setPreferences(){
    let profilePreferences = this.selectedCat

    if (this.selectedCat.length == 0){
      //cambiar cuando decidamos lo de los alert
      alert("no has seleccionado nada, selecciona algo o haz click en más tarde")
    }else{
      this.registerPartThree.emit(profilePreferences)

    }

    
  }

  setPreferencesLoggedIn(){
    let profilePreferences = this.selectedCat

    if (this.selectedCat.length == 0){
      //cambiar cuando decidamos lo de los alert
      alert("no has seleccionado nada, selecciona algo o haz click cancelar")
    }else{
      this.registerPartThreeLoggedIn.emit(profilePreferences)
      
    }

    
  }


  

}
