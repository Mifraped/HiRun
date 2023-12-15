import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { ServiceService } from 'src/app/shared/service.service';
import { UserService } from 'src/app/shared/user.service';
import { Job } from 'src/app/models/job';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { HeaderNavbarService } from 'src/app/shared/header-navbar.service';

@Component({
  selector: 'app-edit-service',
  templateUrl: './edit-service.component.html',
  styleUrls: ['./edit-service.component.css']
})
export class EditServiceComponent  implements OnInit{

  service = this.serviceService.service
  jobs:Job[]=this.service.jobs

  selectedJob:Job


  public addJobForm: FormGroup
  public editServiceForm: FormGroup
  
  //variables para mostras/ocultar header y navbar  
  showHeader:boolean=false
  showNavBar:boolean=false

  //Importa las categorías del servicio 'service'
  allCat = this.serviceService.allCat
  selectedCat:Category[]

  //opciones adicionales: pago en efcetivo, servicio a domicilio, etc
  opt1 ={value:'Servicio a domicilio', icon:'fa-solid fa-house'}
  opt2 ={value:'Pago en efectivo', icon:'fa-solid fa-coins'}
  opt3 ={value:'Pago con tarjeta', icon:'fa-regular fa-credit-card'}
  opt4 ={value:'Otra opción extra', icon:'fa-solid fa-face-grin-stars'}

  allOptions = [this.opt1, this.opt2, this.opt3, this.opt4]
  selectedOptions:string[] = []


  //El usuario logeado, que será el proveedor del servicio
  user = this.userService.user

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

//ejemplos timeframe -ELIMINAR AL AÑADIR FUNCIONALIDAD
tf1 = {t0:'08:30', t1:'14:30', days: [true, true, true,true,true,false,false] }
tf2 = {t0:'16:30', t1:'18:00', days: [true, true, true,true,false,false,false]  }
tf3 = {t0:'10:00', t1:'14:00', days: [false, false, false,false,false,true,false]  }
tf4 = {t0:'15:20', t1:'21:00', days: [true, true, true,true,true,true,true] }

timeFrameArray=[this.tf1, this.tf2, this.tf3, this.tf4]


  constructor( public userService:UserService,public serviceService:ServiceService, private formBuilder: FormBuilder,private router: Router , public headerNavbarService: HeaderNavbarService) { 
    this.headerNavbarService.showHeader=false
    this.headerNavbarService.showNavbar=false
    this.buildFormJobs();
    this.buildFormService();
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
  
  
//formulario interior de crear trabajos
  private buildFormJobs(){
    this.addJobForm = this.formBuilder.group({
      title:  [, [Validators.required, ]],
      price:  [, [Validators.required,]],
      description:  [, [Validators.required, ]],
      duration:  [, [Validators.required, this.fifteenMinutes]],
     
    })
  }
  
  //Validación para limitar la duración de los trabajos a franjas de 15min o múltiplos
  private fifteenMinutes(control: AbstractControl){
    let resultado = {checkResult:true}
    if (control.value%15===0){
      resultado = null
    }else if(!control.value){
      resultado=null
    }
    return resultado
}

//formulario general de crear servicios
private buildFormService(){
  this.editServiceForm = this.formBuilder.group({
    title:  [, [Validators.required, ]],
    jobs:  [, [Validators.required]],
    // jobs:  [, [Validators.required, this.atLeastOne]], //pendiente definir
    photo:  [, ],
    otherFields: this.formBuilder.array([], Validators.required),
    
     })
}



//Validación
// private atLeastOne(control: AbstractControl){
//   let resultado = {checkResult:true}
//   if (control.value.length > 0){
//     resultado = null
//   }else if(!control.value){
//     resultado=null
//   }
//   return resultado
// }

 
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

  //Añade los trabajos generados al array jobs del servicio, o los edita
 addOrEditJob()  {
    console.log('entra')
    if(!this.selectedJob){

      let newJob = this.addJobForm.value
      this.jobs.push(newJob)
      this.addJobForm.reset()
      alert('Trabajo añadido correctamente')
    }else{
      this.selectedJob =this.addJobForm.value
      console.log(this.selectedJob)
    }


    console.log(this.jobs)
  }

//Elimina un trabajo creado por medio de addJobForm antes de guardar el servicio
deleteJob(index){
  this.selectedJob = null
  this.jobs.splice(index, 1)
  console.log(this.jobs)
  console.log(this.selectedJob)
}
 //seleccionar/deseleccionar trabajos en el listado
selectJob(index){

  if(this.selectedJob === this.jobs[index]){
    this.selectedJob = null
    this.addJobForm.patchValue({
      title: null,
      price: null,
      description: null,
      duration: null,
      
    });
  }else{
    this.selectedJob=this.jobs[index]
    this.addJobForm.patchValue({
      title: this.selectedJob.title,
      price: this.selectedJob.price,
      description: this.selectedJob.description,
      duration: this.selectedJob.duration,
      
    });

  }
 
  

}


deleteTimeframe(index){
  this.timeFrameArray.splice(index, 1)

}

//Nuevo servicio con la info del form + información adicional que viene del servicio, del formulario de jobs, etc.
newService() {
  let newService = this.editServiceForm.value;
  newService.jobs = this.jobs
  newService.tags = this.selectedCat
  newService.provider = this.user
  newService.otherFields=this.selectedOptions

  console.log(newService)

  this.selectedCat=[];
  this.selectedOptions=[];
  this.jobs=[]
  this.editServiceForm.reset()

}

cancelNewService(){
  //PENDIENTE DEFINIR LÓGICA: pongo que vuelva al perfil
  this.editServiceForm.reset()
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
  console.log(this.timeFramesOpen)
}

closeModal() {
  this.timeFramesOpen = false;
}

ngOnInit() {
  //para que el formulario coja por defecto los valores del servici a editar
  this.selectedCat=this.service.tags
 //pendiente de ver como seleccionar de iniciolas que ya tenga el servicio
  this.editServiceForm.patchValue({
    title: this.service.title,
    
  });
}

}