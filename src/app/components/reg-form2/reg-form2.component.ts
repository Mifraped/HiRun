import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { GeolocationService } from 'src/app/shared/geolocation.service';

@Component({
  selector: 'app-reg-form2',
  templateUrl: './reg-form2.component.html',
  styleUrls: ['./reg-form2.component.css']
})
export class RegForm2Component implements OnInit{
  public regForm2: FormGroup;

  @Output() registerPartTwo = new EventEmitter<any>();

 constructor (private formBuilder: FormBuilder, public geolocationService:GeolocationService){
    this.buildForm();
  }

  municipios = []

  registerNext(){
    let regInfoNext = this.regForm2.value

    const mun = this.regForm2.get('location').value
    const m = this.municipios.find(m => m.municipio === mun);
    const coordValue=`{"latitude":${m.latitude}, "longitude": ${m.longitude}}`
    // this.regForm2.get('location').setValue(coordValue)
    regInfoNext.location=coordValue
    console.log(regInfoNext)
    this.registerPartTwo.emit(regInfoNext)
  }

  private buildForm(){
    this.regForm2 = this.formBuilder.group({
      name:  [, [Validators.required, this.onlyLetters]],
      surname:  [, [Validators.required, this.onlyLetters]],
      location:  [, [Validators.required, (control) => this.includedInList(control, this.municipios)]],
      phoneNumber:  [, [Validators.required]],
      company:  [, []],
    })
  }

private includedInList(control: AbstractControl, list){
  let resultado = {notInList:true}
  let checkList = false

  for (let i = 0; i<list.length; i++){
    if (list[i].municipio===control.value){
      checkList =true
      i=list.length
    }
  }

  if(checkList){
    resultado = null
  }else if(!control.value){
    resultado=null
  }
  return resultado
  

}

private onlyLetters(control: AbstractControl){
  let resultado = {hasSymbol: true};

  const letters = /^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑÇç' -]+$/u.test(control.value)

  if (letters){
    resultado=null
  }else if(!control.value){
    resultado=null
  }
  return resultado

}

seleccionar(e) {
  //Obtener el valor
  console.log(e.srcElement.value);

}

getCoord(m):string{
  return `{latitude:${m.latitude}, longitude: ${m.longitude}}`

}
    ngOnInit(): void {     

        this.municipios =this.geolocationService.cityList
    
    }
}
