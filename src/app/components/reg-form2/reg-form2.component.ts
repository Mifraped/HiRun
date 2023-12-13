import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-reg-form2',
  templateUrl: './reg-form2.component.html',
  styleUrls: ['./reg-form2.component.css']
})
export class RegForm2Component {
  public regForm2: FormGroup;

  @Output() registerPartTwo = new EventEmitter<any>();

 constructor (private formBuilder: FormBuilder){
    this.buildForm();
  }

  registerNext(){
    let regInfoNext = this.regForm2.value
    this.registerPartTwo.emit(regInfoNext)
  }

  private buildForm(){
    this.regForm2 = this.formBuilder.group({
      name:  [, [Validators.required, this.onlyLetters]],
      surname:  [, [Validators.required, this.onlyLetters]],
      location:  [, [Validators.required, this.onlyLetters]],
      phoneNumber:  [, [Validators.required]],
      company:  [, []],
    })
  }

private onlyLetters(control: AbstractControl){
  let resultado = {hasSymbol: true};

  const letters = /^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑÇç']+$/u.test(control.value)

  if (letters){
    resultado=null
  }else if(!control.value){
    resultado=null
  }
  return resultado

}

}
