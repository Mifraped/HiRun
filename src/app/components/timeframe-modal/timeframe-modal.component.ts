import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-timeframe-modal',
  templateUrl: './timeframe-modal.component.html',
  styleUrls: ['./timeframe-modal.component.css']
})
export class TimeframeModalComponent {

  @Output() closeWindow = new EventEmitter<void>()
  timeFramesOpen:boolean = true
  //días de la semana
  week = [
    {number: 1, initial:'L', name:'lunes'},
    {number: 2, initial:'M', name:'martes'},
    {number: 3, initial:'X', name:'miércoles'},
    {number: 4, initial:'J', name:'jueves'},
    {number: 5, initial:'V', name:'viernes'},
    {number: 6, initial:'S', name:'sábado'},
    {number: 7, initial:'D', name:'domingo'}
  
]

timeFrameAccept() {
  // Lógica cuando se hace clic en Aceptar pendiente, y luego llama a cancel, que solo cierra la modal
  this.timeFrameClose()
}

timeFrameClose() {
  // Lógica cuando se hace clic en Cancelar pendient, por ahora solo cierra la modal
  this.closeWindow.emit();
}


//Cambiar los días seleccionados

daySelected(day){

  //por ahora solo se cambia el color y el icono, falta funcionalidad y ver cómo vamos a añadir los horarios
   day.selected = !day.selected

  
  }

}
