import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { BusinessService } from 'src/app/shared/business.service';
import { UserService } from 'src/app/shared/user.service';
import { Service} from 'src/app/models/service';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
  FormControl,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HeaderNavbarService } from 'src/app/shared/header-navbar.service';
import { CommonModule } from '@angular/common';
import { ResponseBusiness } from 'src/app/models/response-business';
import { ResponseService } from 'src/app/models/response-service';
import { ServiceService } from 'src/app/shared/service.service';
import { TimeframeService } from 'src/app/shared/timeframe.service';
import { TimeFrame } from 'src/app/models/time-frame';
import { ResponseTimeframe } from 'src/app/models/response-timeframe';
import { CategoryService } from 'src/app/shared/category.service';
import { OptionService } from 'src/app/shared/option.service';
import { ResponseCategory } from 'src/app/models/response-category';
import { ResponseBusOpt } from 'src/app/models/response-bus-opt';
import { BusinessOpt } from 'src/app/models/business-opt';
import { ResponseBusCat } from 'src/app/models/response-bus-cat';
import { BusinessCat } from 'src/app/models/business-cat';
import { Time } from "@angular/common";
import { formatDate } from '@angular/common';
import Swal from 'sweetalert2';
import { Business } from 'src/app/models/business';

@Component({
  selector: 'app-edit-business',
  templateUrl: './edit-business.component.html',
  styleUrls: ['./edit-business.component.css'],
})
export class EditBusinessComponent implements OnInit {

  
  business = this.businessService.business;
  services: Service[] = this.business.services;
  initialOptions:BusinessOpt[] = []


  //almacenar aparte los cambios para editar después
  newServices:Service[]=[]
  editServices:Service[]=[]
  deleteServices:Service[]=[]


  selectedService: Service;

  public addServiceForm: FormGroup;
  public editBusinessForm: FormGroup;

  //variables para mostras/ocultar header y navbar
  showHeader: boolean = false;
  showNavBar: boolean = false;

 //se importan en oninit
  allCat:Category[] = []
  selectedCat:Category[] = []
  busCat:BusinessCat[]

  //opciones adicionales: pago en efcetivo, negocio a domicilio, etc
  opt1 ={value:'Servicio a domicilio', icon:'fa-solid fa-house', i:1}
  opt2 ={value:'Servicio online', icon:'fa-solid fa-laptop', i:2}
  opt3 ={value:'Pago con tarjeta', icon:'fa-regular fa-credit-card', i:3}
  opt4 ={value:'Pago en efectivo', icon:'fa-solid fa-coins', i:4}

  allOptions = [this.opt1, this.opt2, this.opt3, this.opt4];
  selectedOptions:number[] = []
  
  //El usuario logeado, que será el proveedor del negocio
  user = this.userService.user;

  //días de la semana
  week = [
    { number: 1, initial: 'L', name: 'lunes' },
    { number: 2, initial: 'M', name: 'martes' },
    { number: 3, initial: 'X', name: 'miércoles' },
    { number: 4, initial: 'J', name: 'jueves' },
    { number: 5, initial: 'V', name: 'viernes' },
    { number: 6, initial: 'S', name: 'sábado' },
    { number: 7, initial: 'D', name: 'domingo' },
  ];

  //variable para ventana modal de timeframes
  timeFramesOpen: boolean = false;

  timeframes: TimeFrame[]
  timeFrameArray = [];
  tfDelete=[]

  constructor(
    public userService: UserService,
    public businessService: BusinessService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    public serviceService:ServiceService,
    public headerNavbarService: HeaderNavbarService,
    private commonModule: CommonModule,
    public timeframeService: TimeframeService,
    public categoryService: CategoryService,
    public optionsService:OptionService
  ) {
    this.headerNavbarService.showHeader = false;
    this.headerNavbarService.showNavbar = false;
    this.buildFormServices();
    this.buildFormBusiness();
    
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
  private buildFormServices() {
    this.addServiceForm = this.formBuilder.group({
      title: [, [Validators.required]],
      price: [, [Validators.required]],
      description: [, [Validators.required]],
      duration: [, [Validators.required, this.fifteenMinutes]],
    });
  }

  //Validación para limitar la duración de los servicios a franjas de 15min o múltiplos
  private fifteenMinutes(control: AbstractControl) {
    let resultado = { checkResult: true };
    if (control.value % 15 === 0) {
      resultado = null;
    } else if (!control.value) {
      resultado = null;
    }
    return resultado;
  }

  //formulario general de crear negocios
  private buildFormBusiness() {
    this.editBusinessForm = this.formBuilder.group({
      title: [, [Validators.required]],
      services: [, [Validators.required]],
      // services:  [, [Validators.required, this.atLeastOne]], //pendiente definir
      photo: [,],
      otherFields: this.formBuilder.array([], Validators.required),
    });
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
  catSelected(category) {
    const i = this.selectedCat.indexOf(category);
    if (i === -1) {
      // si no está se añade
      this.selectedCat.push(category);
    } else {
      // Si está se elimina
      this.selectedCat.splice(i, 1);
    }  
    // cambiar .selected
    category.selected = !category.selected;
    
  }

  //Añade los servicios generados al array services del negocio, o los edita
  addOrEditService() {
    if (!this.selectedService) {
      let newService = this.addServiceForm.value;
      newService.id_business=this.business.id_business
      this.services.push(newService);
       //añade el servicio modificado al array de servicios a incluir (post)
      this.newServices.push(newService)
      this.addServiceForm.reset();
      Swal.fire({
        text: "Servicio añadido.",
        icon: "success",
        confirmButtonColor: "var(--green)",
      });
    } else {

      Swal.fire({        
        title: "¿Seguro?",
        text: "Esta acción no se puede deshacer",
        icon: "warning",
        showCancelButton: true,
        
        confirmButtonColor: "var(--green)",
        cancelButtonColor: "var(--red)",
        confirmButtonText: "Sí, guardar cambios",
        cancelButtonText: "Cancelar"
      }).then((result) => {
        if (result.isConfirmed) {
          const i = this.services.indexOf(this.selectedService)
          const id_service =this.selectedService.id_service
          const id_business =this.selectedService.id_business
          this.selectedService = this.addServiceForm.value;
          this.selectedService.id_service=id_service
          this.selectedService.id_business=id_business
          this.serviceService.putService(this.selectedService).subscribe((res:ResponseService)=>{
            if (res.error){
              console.log('error')
              alert(res.error)
            }else{
              console.log('servicio modificado')
              this.services[i]=this.selectedService
            }
          })
          Swal.fire({
            text: "Tu servicio se ha modificado correctamente.",
            icon: "success",
            confirmButtonColor: "var(--green)",
          });
        }
      });

      
    }

    console.log(this.services);
  }

  //Elimina un servicio creado por medio de addServiceForm antes de guardar el negocio
  deleteService(index) {
    
    Swal.fire({        
      title: "¿Eliminar servicio?",
      text: "Tendrás que cancelar la edición del negocio si quieres recuperar este servicio",
      icon: "warning",
      showCancelButton: true,
      
      confirmButtonColor: "var(--green)",
      cancelButtonColor: "var(--red)",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        //añade el servicio modificado al array de servicios a incluir (post)
        this.deleteServices.push(this.services[index])
        this.selectedService = null;
        this.services.splice(index, 1);
        console.log(this.deleteServices);
        
        Swal.fire({
          text: "El servicio se ha eliminado.",
          icon: "success",
          confirmButtonColor: "var(--green)",
        });
      }
    });

    
    
  }
  //seleccionar/deseleccionar servicios en el listado
  selectService(index) {
    if (this.selectedService === this.services[index]) {
      this.selectedService = null;
      this.addServiceForm.patchValue({
        title: null,
        price: null,
        description: null,
        duration: null,
      });
    } else {
      this.selectedService = this.services[index];
      this.addServiceForm.patchValue({
        title: this.selectedService.title,
        price: this.selectedService.price,
        description: this.selectedService.description,
        duration: this.selectedService.duration,
      });
    }
  }

  deleteTimeframe(index) {
    if (this.timeFrameArray[index].id_tf){
      this.tfDelete.push(this.timeFrameArray[index].id_tf)
    }

    this.timeFrameArray.splice(index, 1);
  }
  //funciones para ir haciendo los cambios al llamar a editBusiness()
  //eliminar servicios
  serviceDeletion(){
    for (let service of this.deleteServices){
      if (service.id_service){
        this.serviceService.deleteService(service.id_service).subscribe((res:ResponseService)=>{
        if (res.error){
          console.log(res)
          alert(res.error)
        }else{
          console.log(res)
          
        }
      })
      }
      
    }
  }

  serviceAddition(){
    for (let service of this.newServices){
      this.serviceService.postService(service).subscribe((res:ResponseService)=>{
      
        if (res.error){
          console.log('error')
          alert(res.error)
        }else{
          console.log('servicio añadido')
        }
      })
    }
  }

  addNewTimeFrame(tf:TimeFrame){  
    this.timeframeService.postTimeframe(tf).subscribe((res:ResponseTimeframe)=>{
   
      if (res.error){
        console.log('error')
        alert(res.error)
      }else{
        console.log('franja horaria añadida')
      }
    })
  }

  //editar negocio con la info del form + info adicional que viene del negocio, del formulario de services, etc. falta lógica solo recoge datos
  editBusiness() {

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
        title: "ERROR",
      text: "Debes indicar tus horarios",
      icon: "error",
      confirmButtonColor: "var(--green)",
      confirmButtonText: "OK"
      })
    }else{

    

    Swal.fire({        
      title: "¿Seguro?",
      text: "Esta acción es irreversible",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "var(--green)",
      cancelButtonColor: "var(--red)",
      confirmButtonText: "Publicar cambios",
      cancelButtonText: "Cancelar"
    }).then( (result) => {
      if (result.isConfirmed) {
        if(this.deleteServices){
          this.serviceDeletion()
        }
        if (this.newServices){
          this.serviceAddition()
        }
        //añadir categorías: las que estén en selectedCat y no estaban en busCat
        const catsToAdd = this.selectedCat.filter((selectedCatItem) => {
          return !this.busCat.some((busCatItem) => busCatItem.category === selectedCatItem.id_category);
        });
        if(catsToAdd){
          for (let cat of catsToAdd){
            const newBusCat:BusinessCat = {business: this.business.id_business, category: cat.id_category}
            this.categoryService.postBusinessCat(newBusCat).subscribe((res:ResponseBusCat)=>{
            
            if (res.error){
              console.log('error')
              alert(res.error)
            }else{
              console.log('categoría añadida')
            }
            })
          }
        }
        //eliminar las categorías que estaban en buscat y no están en selectedcat
        const catsToRemove = this.busCat.filter((busCatItem) => {
          return !this.selectedCat.some((selectedCatItem) => selectedCatItem.id_category === busCatItem.category);
        });
        if(catsToRemove){
          for (let cat of catsToRemove){
            this.categoryService.deleteBusinessCat(cat.id_business_cat).subscribe((res:ResponseBusCat)=>{
              
              if (res.error){
                console.log('error')
                alert(res.error)
              }else{
                console.log('categoría eliminada')
              }
            })
          }
        }

        //opciones adicionales: añadir
          const optsToAdd = this.selectedOptions.filter((selectedOptItem)=>{
          return !this.initialOptions.some((initialOptItem)=>initialOptItem.id_options === selectedOptItem)
        })

        if(optsToAdd){
          for (let opt of optsToAdd){
            const newBusOpt:BusinessOpt={business: this.business.id_business, id_options:opt}
            this.optionsService.postBusinessOpt(newBusOpt).subscribe((res:ResponseBusOpt)=>{
             
              if (res.error){
                console.log('error')
                alert(res.error)
              }else{
                console.log('opción añadida')
              }
            })
          }
        }
        //opciones adicionales: eliminar 
        
        const optsToRemove = this.initialOptions.filter(item => !this.selectedOptions.includes(item.id_options))

 
        if(optsToRemove){
        
          for (let opt of optsToRemove){
              this.optionsService.deleteBusinessOpt(opt.id_business_options).subscribe((res:ResponseBusOpt)=>{
             
              if (res.error){
                console.log('error')
                alert(res.error)
              }else{
                console.log('opción eliminada')
              }
            })
          }
        }
        //timeframes
        //eliminar
        if (this.tfDelete){
          for (let tf of this.tfDelete){
            this.timeframeService.deleteTimeframe(tf).subscribe((res:ResponseTimeframe)=>{
              if (res.error){
                console.log('error')
                alert(res.error)
              }else{
                console.log('franja eliminada')
              }
            })
          }
        }
        //añadir
        for (let tf of this.timeFrameArray){
          if (!tf.id_tf){
            let newTf:TimeFrame ={start:tf.start, end: tf.end, days:"", id_business: this.business.id_business}
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

        //cambios en el propio business
        let modBusiness:Business =this.editBusinessForm.value
        
        modBusiness.id_business=this.business.id_business
      

        this.businessService.updateBusiness(modBusiness).subscribe((res:ResponseBusiness)=>{
          if (res.error) {
            alert(res.error);        
          } else {
            console.log('negocio editado');
          
          }
        })
        Swal.fire({
          title: "¡Actualizado!",
          text: "El negocio ha sido editado con éxito.",
          icon: "success",
          confirmButtonColor: "var(--green)",
        });
      }
    })
      
    
    
    
    this.router.navigate(['/service-provided']);
  }}
  

  deleteBusiness(){
    //cuando esté el calendario habrá que confirmar que no hay citas activas
    Swal.fire({        
      title: "¿Estás seguro?",
      text: "Esta acción es irreversible",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "var(--green)",
      cancelButtonColor: "var(--red)",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar"
    }).then( (result) => {
      if (result.isConfirmed) {
        const id = this.business.id_business
        //eliminar timeframes
        this.timeframeService.deleteBusinessTimeframe(id).subscribe((res:ResponseTimeframe)=>{
          if (res.error){
            console.log('error')
            alert(res.error)
          }
        })
        //eliminar opciones
        this.optionsService.deleteAllBusinessOpt(id).subscribe((res:ResponseBusOpt)=>{
          if (res.error){
            console.log('error')
            alert(res.error)
          }
        })
        //eliminar categorías
        this.categoryService.deleteAllBusinessCat(id).subscribe((res:ResponseBusCat)=>{
          if (res.error){
            console.log('error')
            alert(res.error)
          }
        })
        //eliminar servicios
        this.serviceService.deleteAllService(id).subscribe((res:ResponseService)=>{
          if (res.error){
            console.log(res)
            alert(res.error)
          }else{
            console.log(res)
            
          }})
        //eliminar negocio
        this.businessService.deleteBusiness(id).subscribe((res:ResponseBusiness)=>{
          if (res.error){
            console.log(res)
            alert(res.error)
          }else{
            console.log(res)
          }
        })
        
        Swal.fire({
          title: "¡Eliminado!",
          text: "El negocio ha sido borrado.",
          icon: "success",
          confirmButtonColor: "var(--green)",
        });
      }
      this.router.navigate(['/service-provided']);
    });
  }


  cancelEditBusiness() {
    //PENDIENTE DEFINIR LÓGICA: pongo que vuelva al perfil
    this.editBusinessForm.reset();
    this.router.navigate(['/profile']);
  }

  //Cambiar los días seleccionados - pendiente ver si se puede coger la info de lso timeframes
  daySelected(day) {
    day.selected = !day.selected;
  }

  ////funciones para ventana modal de timeframes
  timeFramesWindow() {
    this.timeFramesOpen = true;
    
    console.log(this.timeFramesOpen);
  }

  closeModal() {
    this.timeFramesOpen = false;
  }

  newTimeFrame(newTimeFrame: any){
    console.log(newTimeFrame)
  this.timeFrameArray.push(newTimeFrame)
  this.closeModal()
  }

  




  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id_business');
    //para obtener todas las categorías de la bbdd
    this.categoryService.getAllCat().subscribe((res:ResponseCategory)=>{
      if (res.error){
      }else{
        this.allCat=res.data
        // categorías del negocio a editar
        this.categoryService.getBusinessCat(+id).subscribe((res:ResponseBusCat)=>{
          if (res.error){
            console.log('error')
            alert(res.error)
          }else{    
            this.busCat=res.data 
          }
          this.selectedCat = this.allCat.filter(category =>
            this.busCat.find(item => item.category === category.id_category) !== undefined);
        })
      }
    })
      
    //datos del negocio
    this.businessService.getBusinessById(+id).subscribe((res:ResponseBusiness)=>{
      
      if (res.error){
        console.log('error')
        alert(res.error)
      }else{    
        this.business=res.data[0]
        this.editBusinessForm.patchValue({
          title: this.business.title,
        });
        
      }
    })

    //servicios del negocio a editar
    this.serviceService.getAllServices(+id).subscribe((res:ResponseService)=>{
    
      if (res.error){
        console.log('error')
        alert(res.error)
      }else{    
        this.services=res.data
      }
    })
    //timeframes del negocio a editar
    this.timeframeService.getBusinessTimeframe(+id).subscribe((res:ResponseTimeframe)=>{
      if (res.error){
        console.log('error')
        alert(res.error)
      }else{    
        this.timeframes=res.data
      
        for (let tf of this.timeframes){
          
          let boolDays:Boolean[] = [false, false, false,false, false,false,false]

          const modStart = tf.start.toString().slice(0, -3)
          const modEnd = tf.end.toString().slice(0, -3)

          for (let i=0;i<tf.days.length; i++){
            const initial = tf.days[i]
            const weekIndex = this.week.find(d => d.initial ===initial)
            boolDays[weekIndex.number-1]=true
          }

          let tfMod = { start: modStart, end: modEnd, days:boolDays ,id_tf: tf.id_timeframe}
          
          this.timeFrameArray.push(tfMod)
        }
      }
    })
    //opciones extra del negocio a editar
    this.optionsService.getBusinessOpt(+id).subscribe((res:ResponseBusOpt)=>{
      if (res.error){
        console.log('error')
        alert(res.error)
      }else{    
        for  (let i=0; i<res.data.length;i++){
          console.log(res.data[i])
          this.selectedOptions.push(res.data[i].id_options)
          this.initialOptions.push(res.data[i])
          
        }
        console.log(this.initialOptions)
        
      }
    })
  
  }
}
