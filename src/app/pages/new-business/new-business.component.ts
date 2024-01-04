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
import {HttpClient} from '@angular/common/http'
import Swal from 'sweetalert2';

import { ResponseImg } from 'src/app/models/response-img';
import { CommonModule, DatePipe } from '@angular/common';
import { PhotoService } from 'src/app/shared/photo.service';
import { ResponsePhoto } from 'src/app/models/response-photo';


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

 //se importan en oninit
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

photoUrl: string = ""

//para loa foto copio lo del perfil
public fileToUpload: File = null;
public imagePreview: string;


  constructor( public userService:UserService,public businessService:BusinessService, private formBuilder: FormBuilder,private router: Router , public headerNavbarService: HeaderNavbarService, public categoryService:CategoryService, public serviceService:ServiceService, public timeframeService:TimeframeService, public optionService:OptionService, public http:HttpClient,  private datePipe: DatePipe, private photoService: PhotoService) { 
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
  
 onFileSelected(event) {
  if (event.target.files && event.target.files[0]) {
    this.fileToUpload = event.target.files[0];

    const reader = new FileReader();
    reader.onload = e => this.imagePreview = reader.result as string;

    reader.readAsDataURL(this.fileToUpload);
  }
}



//fecha creación en formato yyyy-mm-dd
getCreationDate(): string {
  const today = new Date();
  return this.datePipe.transform(today, 'yyyy-MM-dd');
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
Swal.fire({
  text: "Servicio añadido.",
  icon: "success",
  confirmButtonColor: "var(--green)",
});
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
  this.categoryService.postBusinessCat(busCat).subscribe((res:ResponseBusCat)=>{
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
  if(this.selectedOptions){

    for (let opt of this.selectedOptions){
      this.addNewBusinessOpt(this.newId, opt)
    }
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

timeFrameOverlap: boolean

//bucle timeframes
async addAllTimeframes(){
  try {
    const res: ResponseTimeframe = await this.timeframeService.getUserTimeframe(this.userService.user.id_user).toPromise();
    console.log(res);

    if (res.error) {
      console.log('error');
      alert(res.error);
      return;
    }

    const allTfs = res.data;
  
 for (let tf of this.timeFrameArray){
  let overlap: Boolean = false
  console.log(tf)
  let newTf:TimeFrame ={start:tf.start, end: tf.end, days:"", id_business: this.newId}
  let strDays:string=""
      for (let i=0; i<7; i++){
        if (tf.days[i]) {
          strDays = strDays+this.week[i].initial;
        }
      }  
    newTf.days=strDays
    
    for (let oldTf of allTfs){
      for (let tfDay of strDays){
        for (let oldTfDay of oldTf.days){
          
          if (tfDay===oldTfDay){
            
            if ((newTf.start >= oldTf.start && newTf.start < oldTf.end) ||
            (newTf.end > oldTf.start && newTf.end <= oldTf.end) ||
            (newTf.start <= oldTf.start && newTf.end >= oldTf.end)) {
              overlap = true
            }
           
          }
        }
      }

    }
    if (!overlap) {
      this.addNewTimeFrame(newTf);
    }else{
      this.timeFrameOverlap=true
    }
} 
} catch (error) {
  console.error('Error fetching user timeframes:', error);
}
}


async addPhoto() {
  return new Promise<void>((resolve, reject) => {
    const fileExtension = this.fileToUpload.name.split('.').pop();
    const uniqueFileName = `photo_${Date.now()}.${fileExtension}`;

    console.log('nombre foto: ' + uniqueFileName);

    const formData = new FormData();
    formData.append('photo', this.fileToUpload, uniqueFileName);

    this.photoService.uploadPhoto(formData).subscribe((resp: ResponsePhoto) => {
      if (resp.error === false) {
        this.photoUrl = resp.data;
        console.log('resp.data: ' + this.photoUrl);
        resolve(); // Resuelve la promesa cuando la carga de la foto es exitosa
      } else {
        console.log('error foto');
        reject(new Error('Error al cargar la foto')); // Rechaza la promesa en caso de error
      }
    });
  });
}

//Nuevo negocio con la info del form + información adicional que viene del negocio, del formulario de services, etc.
async preliminaryChecks() {
 
  if (this.services.length==0){  
    this.addServiceForm.get('title').markAsTouched() 
    Swal.fire({
      title: "ERROR",
    text: "El negocio debe incluir al menos un servicio",
    icon: "error",
    confirmButtonColor: "var(--green)",
    confirmButtonText: "OK"
    })
  }else if(this.timeFrameArray.length==0){  
    Swal.fire({
      title: "No has indicado horarios",
    text: "Si continuas con la creación del negocio, deberás gestionar las reservas personalmente",
    icon: "warning",
    confirmButtonColor: "var(--green)",
    confirmButtonText: "Guardar",
    showCancelButton: true,
    cancelButtonText: "Cancelar"
    }).then((result)=>{
      if (result.isDenied){
        Swal.fire("Changes are not saved", "", "info")
      }else if (result.isConfirmed){

        this.newBusiness()
      }
    })}}
  

async newBusiness(){


   if(this.fileToUpload){     
    // Crear un nombre único usando un timestamp
    
   await this.addPhoto()
   console.log('foto ok')
  
  }
    let newBusiness = this.newBusinessForm.value;
    newBusiness.create_date = this.getCreationDate()
    newBusiness.provider = this.userService.user.id_user
    newBusiness.photo = this.photoUrl   
  console.log(this.photoUrl)
 
    // llamada a la función que conecta con el servicio y la api
    await this.addBusiness(newBusiness)
    console.log('newbusiness')
    console.log(newBusiness)
    console.log(this.newId)

    //itera para añadir los servicios dentro del negocio
    await this.addAllServices()

  //itera para asignar categorías o etiquetas al negocio
    if (this.selectedCat){
      await this.addAllCats()
    }

    // itera para añadir timeframes
    await this.addAllTimeframes()
    
    await this.addAllBusOptions()
    
    let texto:string = (this.timeFrameOverlap)? "Revisa tus horarios: algunas franjas horarias no se han añadido por solapamiento con otros negocios activos":"Tu nuevo negocio se ha añadido correctamente"

    this.selectedCat=[];
    this.selectedOptions=[];
    this.services=[]
    this.newBusinessForm.reset()
    Swal.fire({
      title: "Negocio creado",
    text: texto,
    icon: "success",
    confirmButtonColor: "var(--green)",
    confirmButtonText: "OK"
    })
    this.router.navigate(['/service-provided'])
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

