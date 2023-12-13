import { Component, EventEmitter, Output } from '@angular/core';
import { Category } from 'src/app/models/category';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-reg-form3',
  templateUrl: './reg-form3.component.html',
  styleUrls: ['./reg-form3.component.css']
})
export class RegForm3Component {
  
  @Output() registerPartThree = new EventEmitter<any>();
  @Output() registerPartThreeLoggedIn = new EventEmitter<any>();
  constructor(public userService:UserService){}
  
  //para enlazar los a
  login = '/login' 
  profile = '/profile'

 //bbdd: según como hagamos lo de las categorías, cuando el usuario esté logeado habrá que hacer GET y restar los gustos actuales(si los hay)

 cat1:Category ={categoryId: 1, title: 'Fontanería'}
 cat2:Category ={categoryId: 2, title: 'Estética'}
 cat3:Category ={categoryId: 3, title: 'Peluquería'}
 cat4:Category ={categoryId: 4, title: 'Diseño'}
 cat5:Category ={categoryId: 5, title: 'Maquillaje'}
 cat6:Category ={categoryId: 6, title: 'Música'}
 cat7:Category ={categoryId: 7, title: 'Informática'}
 cat8:Category ={categoryId: 8, title: 'Cuidados'}
 cat9:Category ={categoryId: 9, title: 'Hogar'}
 cat10:Category ={categoryId: 10, title: 'Mascotas'}
 cat11:Category ={categoryId: 11, title: 'Fontanería2'}
 cat12:Category ={categoryId: 12, title: 'Estética2'}
 cat13:Category ={categoryId: 13, title: 'Peluquería2'}
 cat14:Category ={categoryId: 14, title: 'Diseño2'}
 cat15:Category ={categoryId: 15, title: 'Maquillaje2'}
 cat16:Category ={categoryId: 16, title: 'Música2'}
 cat17:Category ={categoryId: 17, title: 'Informática2'}
 cat18:Category ={categoryId: 18, title: 'Cuidados2'}
 cat19:Category ={categoryId: 19, title: 'Hogar2'}
 cat20:Category ={categoryId: 20, title: 'Mascotas2'}
 


  allCat = [this.cat1, this.cat2, this.cat3, this.cat4, this.cat5, this.cat6, this.cat7, this.cat8, this.cat9, this.cat10, this.cat11, this.cat12, this.cat13, this.cat14, this.cat15, this.cat16, this.cat17, this.cat18,this.cat19, this.cat20]  
  
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
