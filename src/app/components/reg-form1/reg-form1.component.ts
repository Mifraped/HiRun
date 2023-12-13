import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-reg-form1',
  templateUrl: './reg-form1.component.html',
  styleUrls: ['./reg-form1.component.css']
})
export class RegForm1Component {
  login = '/login' 
  public regForm1: FormGroup;
  
 


  @Output() registerPartOne = new EventEmitter<any>();

  constructor (private formBuilder: FormBuilder){
    this.buildForm();
  }

  register(){

    let regInfo = this.regForm1.value
    
    this.registerPartOne.emit(regInfo)

  }

  private buildForm(){
    const minPassLength = 8;

    this.regForm1 = this.formBuilder.group({
      email: [, [Validators.required, Validators.email]],
      password: [,[ Validators.required, Validators.minLength(minPassLength), this.safePassword]],
      passwordRepeat: [,[Validators.required, this.checkPasswords]],
          

    })
  }

  private safePassword(control: AbstractControl){
    let resultado = {passwordUnsafe: true}
  
    const hasUpperCase = /[A-Z]+/.test(control.value);
    const hasLowerCase = /[a-z]+/.test(control.value);
    const hasNumeric = /[0-9]+/.test(control.value);

    const passwordValid = hasUpperCase && hasLowerCase && hasNumeric

    if (passwordValid){
      resultado=null
    }else if(!control.value){
      resultado=null
    }
    return resultado
  }


  private checkPasswords(control: AbstractControl){
    let resultado = {matchPassword: true}
    if(control.parent?.value.password == control.value){
      resultado = null;
    }
    return resultado
  }
}


