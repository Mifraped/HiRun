import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-reg-form3',
  templateUrl: './reg-form3.component.html',
  styleUrls: ['./reg-form3.component.css']
})
export class RegForm3Component {

  @Output() registerPartThree = new EventEmitter<any>();

  login = '/login' //para enlazar el a

  allCat = ['Fontanería', 'Estética', 'Peluquería', 'Diseño', 'Maquillaje', 'Música', 'Informática', 'Cuidados', 'Hogar', 'Mascotas', 'Fontanería2', 'Estética2', 'Peluquería2', 'Diseño2', 'Maquillaje2', 'Música2', 'Informática2', 'Cuidados2', 'Hogar2', 'Mascotas2', 'Fontanería3', 'Estética3', 'Peluquería3', 'Diseño3', 'Maquillaje3', 'Música3', 'Informática3', 'Cuidados3', 'Hogar3', 'Mascotas3']  

  selectedCat = []

  swap(index: number): void {
    const currentCat = this.allCat[index];

    // Mueve la categoría al otro array
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
    this.registerPartThree.emit(profilePreferences)
    
  }
}
