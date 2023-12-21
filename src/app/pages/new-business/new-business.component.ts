import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { BusinessService } from 'src/app/shared/business.service';
import { UserService } from 'src/app/shared/user.service';
import { Business } from 'src/app/models/business';
import { Service} from 'src/app/models/service';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { HeaderNavbarService } from 'src/app/shared/header-navbar.service';
import { ResponseBusiness } from 'src/app/models/response-business';
import { CategoryService } from 'src/app/shared/category.service';
import { ResponseCategory } from 'src/app/models/response-category';
import { ServiceService } from 'src/app/shared/service.service';
import { ResponseService } from 'src/app/models/response-service';
import { BusinessCat } from 'src/app/models/business-cat';
import { ResponseBusCat } from 'src/app/models/response-bus-cat';
import { TimeFrame } from 'src/app/models/time-frame';
import { TimeframeService } from 'src/app/shared/timeframe.service';
import { ResponseTimeframe } from 'src/app/models/response-timeframe';
import { BusinessOpt } from 'src/app/models/business-opt';
import { ResponseBusOpt } from 'src/app/models/response-bus-opt';
import { OptionService } from 'src/app/shared/option.service';
import { User } from 'src/app/models/user';



@Component({
  selector: 'app-new-business',
  templateUrl: './new-business.component.html',
  styleUrls: ['./new-business.component.css']
})
export class NewBusinessComponent implements OnInit {
  public addServiceForm: FormGroup
  public newBusinessForm: FormGroup
  
  //variables para mostras/ocultar header y navbar  
  showHeader:boolean=false
  showNavBar:boolean=false

  //Importa las categorías del negocio 'business'
  // allCat = this.businessService.allCat
  allCat:Category[] = []
  selectedCat:Category[] = []

  //business_id para crear los servicios, se rellena cuando se genera el negocio
  newId:number

  //opciones adicionales: pago en efcetivo, negocio a domicilio, etc
  opt1 ={value:'Servicio a domicilio', icon:'fa-solid fa-house', i:1}
  opt2 ={value:'Servicio online', icon:'fa-solid fa-laptop', i:2}
  opt3 ={value:'Pago con tarjeta', icon:'fa-regular fa-credit-card', i:3}
  opt4 ={value:'Pago en efectivo', icon:'fa-solid fa-coins', i:4}

  allOptions = [this.opt1, this.opt2, this.opt3, this.opt4]
  // selectedOptions:string[] = []
  selectedOptions:number[] = []

  //array de servicios, se inicializa vacío. Se popula con el form interno que hay dentro del otro form
  services:Service[]=[]

  //El usuario logeado, que será el proveedor del negocio
  user:User
  
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

//variable para ventana modal de timeframes
timeFramesOpen: boolean=false

//se inicializa vacío
timeFrameArray=[]


  constructor( public userService:UserService,public businessService:BusinessService, private formBuilder: FormBuilder,private router: Router , public headerNavbarService: HeaderNavbarService, public categoryService:CategoryService, public serviceService:ServiceService, public timeframeService:TimeframeService, public optionService:OptionService) { 
    this.headerNavbarService.showHeader=false
    this.headerNavbarService.showNavbar=false
    this.buildFormServices();
    this.buildFormBusiness();
  }
  ngOnInit(): void {
    this.categoryService.getAllCat().subscribe((res:ResponseCategory)=>{
          if (res.error){
            console.log(res)
          }else{      
            this.allCat=res.data        
          }
        })
       this.user = this.userService.user
 }
  
// Método para agregar o quitar opciones del array 'selectedOptions' con las opciones extra
  onCheckboxChange(option: any): void {
    const index = this.selectedOptions.indexOf(option.i);
  
    if (index !== -1) {
      // Si el valor ya está en el array, lo quitamos (deseleccionamos)
      this.selectedOptions.splice(index, 1);
    } else {
      // Si el valor no está en el array, lo agregamos (seleccionamos)
      this.selectedOptions.push(option.i);
    }

  }

//formulario interior de crear servicios
  private buildFormServices(){
    this.addServiceForm = this.formBuilder.group({
      title:  [, [Validators.required, ]],
      price:  [, [Validators.required,]],
      description:  [, [Validators.required, ]],
      duration:  [, [Validators.required, this.fifteenMinutes]],
     
    })
  }
  
  //Validación para limitar la duración de los servicios a franjas de 15min o múltiplos
  private fifteenMinutes(control: AbstractControl){
    let resultado = {checkResult:true}
    if (control.value%15===0){
      resultado = null
    }else if(!control.value){
      resultado=null
    }
    return resultado
}

//formulario general de crear negocios
private buildFormBusiness(){
  this.newBusinessForm = this.formBuilder.group({
    title:  [, [Validators.required, ]],
    services:  [, ], //quito el required porque da fallo con el botón, se maneja con el if/else
    photo:  [, ],
    otherFields: this.formBuilder.array([], Validators.required),
    
     })
}

//Añadir/eliminar etiquetas
catSelected(category){
  const i = this.selectedCat.indexOf(category)

  if (!category.selected){
    this.selectedCat.push(category)
    
  }else{
    this.selectedCat.splice(i, 1);
  }
  category.selected = !category.selected
  console.log(this.selectedCat)
  }

  //Añade los servicios generados al array services que se incializa vacío
addService()  {
let newService = this.addServiceForm.value
this.services.push(newService)
this.addServiceForm.reset()
alert('Servicio añadido correctamente')
console.log(this.services)
}

//Elimina un servicio creado por medio de addServiceForm antes de guardar el negocio
deleteService(index){
  this.services.splice(index, 1)
  console.log(this.services)
}

deleteTimeframe(index){
  this.timeFrameArray.splice(index, 1)

}

 //crea el negocio

async addBusiness(newBusiness: Business): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    this.businessService.postBusiness(newBusiness).subscribe(
      (res: ResponseBusiness) => {
        console.log(res);
        if (res.error) {
          alert(res.error);
          reject();
        } else {
          console.log(res.data);
          this.newId = res.data[0].insertId;
          console.log(this.newId);
          resolve();
        }
      },
      (error) => {
        console.error(error);
        reject();
      }
    );
  });
}



//añadir servicio
addNewService(newService:Service){
  this.serviceService.postService(newService).subscribe((res:ResponseService)=>{
    console.log(res)
    if (res.error){
      console.log('error')
      alert(res.error)
    }else{
      console.log('servicio creado')
      this.services=null
    }
  })
}

//bucle servicios
async addAllServices(){
  for (let service of this.services){
    service.id_business =this.newId
     this.addNewService(service)
  }
}


//añadir categorías (business-cat)
addNewBusinessCat(bus:number, cat:number){
  let busCat: BusinessCat = new BusinessCat(bus,cat);
  this.categoryService.postBusinessCat(busCat).subscribe((res:ResponseCategory)=>{
    console.log(res)
    if (res.error){
      console.log('error')
      alert(res.error)
    }else{
      console.log('categoría añadida')
      this.services=null
    }
  })
}
async addAllCats(){
  for (let cat of this.selectedCat){  
    this.addNewBusinessCat(this.newId, cat.id_category)
  }
}


//añadir opciones (business-option)
addNewBusinessOpt(bus:number, opt:number){
  let busOpt:BusinessOpt = new BusinessOpt(bus, opt);
  console.log(busOpt)
  this.optionService.postBusinessOpt(busOpt).subscribe((res:ResponseBusOpt)=>{
    console.log(res)
    if (res.error){
      console.log('error')
      alert(res.error)
    }else{
      console.log('opción añadida')
    }
  })
}

//bucle opciones
async addAllBusOptions(){
  for (let opt of this.selectedOptions){
    this.addNewBusinessOpt(this.newId, opt)
  }

}

//añadir franja horaria
addNewTimeFrame(tf:TimeFrame){  
  this.timeframeService.postTimeframe(tf).subscribe((res:ResponseTimeframe)=>{
    console.log(res)
    if (res.error){
      console.log('error')
      alert(res.error)
    }else{
      console.log('franja horaria añadida')
    }
  })
}

//bucle timeframes
async addAllTimeframes(){
 for (let tf of this.timeFrameArray){
  console.log(tf)
  let newTf:TimeFrame ={start:tf.start, end: tf.end, days:"", id_business: this.newId}

  let strDays:string=""
      for (let i=0; i<7; i++){
      if (tf.days[i]) {
      
        strDays = strDays+this.week[i].initial;
      }
    }
  
    newTf.days=strDays
    this.addNewTimeFrame(newTf)
} 
}


//Nuevo negocio con la info del form + información adicional que viene del negocio, del formulario de services, etc.
async newBusiness() {

  if (this.services.length==0){  
    this.addServiceForm.get('title').markAsTouched() 
    alert('añade al menos un servicio')
  }else if(this.timeFrameArray.length==0){  
    alert('indica tus franjas horarias')
  }else{
    let newBusiness = this.newBusinessForm.value;
    newBusiness.provider = this.userService.user.id_user
    newBusiness.photo='img por defecto'
 
    // llamada a la función que conecta con el servicio y la api
    await this.addBusiness(newBusiness)
    console.log('newbusiness')
    console.log(this.newId)

    //itera para añadir los servicios dentro del negocio
    await this.addAllServices()
    console.log('services')

  //itera para asignar categorías o etiquetas al negocio
    if (this.selectedCat){
      await this.addAllCats()
    }
    console.log('cats')

    // itera para añadir timeframes
    await this.addAllTimeframes()
    console.log('timeframes')

    await this.addAllBusOptions()
    console.log('options')

  this.selectedCat=[];
  this.selectedOptions=[];
  this.services=[]
  this.newBusinessForm.reset()
  this.router.navigate(['/service-provided'])
}

 
}

cancelNewBusiness(){
  //PENDIENTE DEFINIR LÓGICA: pongo que vuelva al perfil
  this.newBusinessForm.reset()
  this.router.navigate(['/profile'])


}

//Cambiar los días seleccionados

daySelected(day){

  //por ahora solo se cambia el color y el icono, falta funcionalidad y ver cómo vamos a añadir los horarios
   day.selected = !day.selected

  
  }

  ////funciones para ventana modal de timeframes - no es funcional: solo abre y cierra la ventana
  timeFramesWindow() {
    this.timeFramesOpen = true;
    
  
  }

  closeModal() {
    this.timeFramesOpen = false;
  }

  newTimeFrame(newTimeFrame: any){
    
this.timeFrameArray.push(newTimeFrame)

this.closeModal()
  }

}


////// SUBIDA DE FOTO - DEJO COMENTADO Y PENDIENTE DE TENER BBDD Y API

// import {HttpClient} from '@angular/common/http'

// incluir http en contructor

//selectedFile:File


//recoge la foto
// onFileChange(event){
//   this.selectedFile = event.target.files[0]
//   console.log(event)
//   this.upload()
// }

// upload(){
//   const uploadData = new FormData();
//   uploadData.append('myFile', this.selectedFile, this.selectedFile.name)

//   //Aquí iría la llamada a la API
// }