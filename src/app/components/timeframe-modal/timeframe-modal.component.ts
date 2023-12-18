import { Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms'

@Component({
  selector: 'app-timeframe-modal',
  templateUrl: './timeframe-modal.component.html',
  styleUrls: ['./timeframe-modal.component.css']
})
export class TimeframeModalComponent {

  @Output() sendTimeFrame = new EventEmitter<void>()
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

appDays:boolean[]=[false,false,false,false,false,false,false]
// days:number[]=[]

public timeframeForm:FormGroup;

timeFrameAccept() {

  if(this.appDays[0] ||this.appDays[1] ||this.appDays[2] ||this.appDays[3] ||this.appDays[4] ||this.appDays[5] || this.appDays[6]){
    let newTimeFrame = this.timeframeForm.value
  
    
    newTimeFrame.days=this.appDays
    console.log(newTimeFrame)
    // Lógica cuando se hace clic en Aceptar pendiente, y luego llama a cancel, que solo cierra la modal
    this.sendTimeFrame.emit(newTimeFrame);
    console.log('enviar')
  this.timeFrameClose()
  
}else{
    alert('Debes incluir al menos un día')
  
}}

timeFrameClose() {
  console.log('cerrar')
  // Lógica cuando se hace clic en Cancelar pendient, por ahora solo cierra la modal
  this.closeWindow.emit();
}


//Cambiar los días seleccionados

daySelected(day){

  // if (this.days.includes(day.number)){
  //   this.days=this.days.filter(item => item !==day.number)
  // }else{
  //   this.days.push(day.number)
  // }
  this.appDays[day.number-1]=!this.appDays[day.number-1]

  //cambia el color y el icono
   day.selected = !day.selected
  
  }

  private buildForm(){
   

    this.timeframeForm = this.formBuilder.group({
      start: ['', { validators: Validators.required, updateOn: 'change' }],
      end: ['', [Validators.required, this.isGreater]],
              

    })
  }
//chequea si la hora final es mayor que la inicial
  private isGreater(control: AbstractControl) {
    let resultado = {isSmaller:true}  

    const start = control.parent?.value.start    
    const end = control.value;  
    if (start && end && start < end) {
      resultado= null; 
    }
    return resultado
  }

  constructor (private formBuilder: FormBuilder){
    this.buildForm();
  }
}
