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
  opt1 ={value:'Servicio a domicilio', icon:'fa-solid fa-house'}
  opt2 ={value:'Pago en efectivo', icon:'fa-solid fa-coins'}
  opt3 ={value:'Pago con tarjeta', icon:'fa-regular fa-credit-card'}
  opt4 ={value:'Otra opción extra', icon:'fa-solid fa-face-grin-stars'}

  allOptions = [this.opt1, this.opt2, this.opt3, this.opt4]
  selectedOptions:string[] = []

  //array de servicios, se inicializa vacío. Se popula con el form interno que hay dentro del otro form
  services:Service[]=[]

  //El usuario logeado, que será el proveedor del negocio
  // user = this.userService.user.userId
  user = 19

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



timeFrameArray=[]


  constructor( public userService:UserService,public businessService:BusinessService, private formBuilder: FormBuilder,private router: Router , public headerNavbarService: HeaderNavbarService, public categoryService:CategoryService, public serviceService:ServiceService, public timeframeService:TimeframeService) { 
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
  }
  


  // Método para agregar o quitar opciones del array 'selectedOptions' con las opciones extra
  onCheckboxChange(option: any): void {
    const index = this.selectedOptions.indexOf(option.value);
  
    if (index !== -1) {
      // Si el valor ya está en el array, lo quitamos (deseleccionamos)
      this.selectedOptions.splice(index, 1);
    } else {
      // Si el valor no está en el array, lo agregamos (seleccionamos)
      this.selectedOptions.push(option.value);
    }

    console.log(this.selectedOptions)
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

addBusiness(newBusiness:Business){
  console.log('add business OK')
  this.businessService.postBusiness(newBusiness).subscribe((res:ResponseBusiness)=>{
    console.log(res)
    if (res.error){
      alert(res.error)
    }else{
      
      console.log(res.data)
      this.newId= res.data[0].insertId
   
      //itera para crear los servicios dentro del negocio
      for (let service of this.services){
        service.id_business =this.newId
        this.addNewService(service)
      }

      //itera para asignar categorías o etiquetas al negocio
      if (this.selectedCat){
        for (let cat of this.selectedCat){
        
        this.addNewBusinessCat(this.newId, cat.id_category)
        }
      }

      console.log(this.timeFrameArray)
      console.log(this.timeFrameArray[0])
      // itera para añadir timeframes
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

      this.businessService.business=null
    }
  })
}

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




//Nuevo negocio con la info del form + información adicional que viene del negocio, del formulario de services, etc.
newBusiness() {

if (this.services.length==0){
  
  this.addServiceForm.get('title').markAsTouched()
 
  alert('añade al menos un servicio')
}else if(this.timeFrameArray.length==0){
  
  alert('indica tus franjas horarias')
}else{
  
   let newBusiness = this.newBusinessForm.value;
   newBusiness.provider = this.user
   newBusiness.photo='img por defecto'
  // this.services
  // this.selectedCat
//  this.selectedOptions
  //this.timeFrameArray

  
  // llamada a la función que conecta con el servicio y la api
  this.addBusiness(newBusiness)

  // this.selectedCat=[];
  // this.selectedOptions=[];
  // this.services=[]
  // this.newBusinessForm.reset()

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