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

@Component({
  selector: 'app-edit-business',
  templateUrl: './edit-business.component.html',
  styleUrls: ['./edit-business.component.css'],
})
export class EditBusinessComponent implements OnInit {

  
  business = this.businessService.business;
  services: Service[] = this.business.services;

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

  //ejemplos timeframe -ELIMINAR AL AÑADIR FUNCIONALIDAD
  tf1 = {
    start: '08:30',
    end: '14:30',
    days: [true, true, true, true, true, false, false],
  };
  tf2 = {
    start: '16:30',
    end: '18:00',
    days: [true, true, true, true, false, false, false],
  };
  tf3 = {
    start: '10:00',
    end: '14:00',
    days: [false, false, false, false, false, true, false],
  };
  tf4 = {
    start: '15:20',
    end: '21:00',
    days: [true, true, true, true, true, true, true],
  };

  timeframes: TimeFrame[]
  timeFrameArray = [];

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
    console.log('entra');
    if (!this.selectedService) {
      let newService = this.addServiceForm.value;
      this.services.push(newService);
      this.addServiceForm.reset();
      alert('Servicio añadido correctamente');
    } else {
      this.selectedService = this.addServiceForm.value;
      console.log(this.selectedService);
    }

    console.log(this.services);
  }

  //Elimina un servicio creado por medio de addServiceForm antes de guardar el negocio
  deleteService(index) {
    this.selectedService = null;
    this.services.splice(index, 1);
    console.log(this.services);
    console.log(this.selectedService);
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
    this.timeFrameArray.splice(index, 1);
  }

  //editar negocio con la info del form + información adicional que viene del negocio, del formulario de services, etc. falta lógica solo recoge datos
  editBusiness() {
    let editedBusiness = this.editBusinessForm.value;
    editedBusiness.services = this.services;
    editedBusiness.tags = this.selectedCat;
    editedBusiness.provider = this.user;
    editedBusiness.otherFields = this.selectedOptions;

    console.log(editedBusiness);

    this.selectedCat = [];
    this.selectedOptions = [];
    this.services = [];
    this.editBusinessForm.reset();
  }
  deleteBusiness(){
    alert('Seguro? bla bla')//pendinte modales
    //lógica de eliminar
  }


  cancelEditBusiness() {
    //PENDIENTE DEFINIR LÓGICA: pongo que vuelva al perfil
    this.editBusinessForm.reset();
    this.router.navigate(['/profile']);
  }

  //Cambiar los días seleccionados

  daySelected(day) {
    //por ahora solo se cambia el color y el icono, falta funcionalidad y ver cómo vamos a añadir los horarios
    day.selected = !day.selected;
  }

  ////funciones para ventana modal de timeframes - no es funcional: solo abre y cierra la ventana
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

  //para cambiar de hh:mm:ss de la bbd a hh:mm del front
  timeFormat(hora:Time){
    const { hours, minutes } = hora;
    return hora;
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id_business');
    //para obtener todas las categorías de la bbdd
    this.categoryService.getAllCat().subscribe((res:ResponseCategory)=>{
      if (res.error){
        console.log(res)
      }else{
        this.allCat=res.data
        // categorías del negocio a editar
        this.categoryService.getBusinessCat(+id).subscribe((res:ResponseBusCat)=>{
          console.log('id categorías:'+id)
          if (res.error){
            console.log('error')
            alert(res.error)
          }else{    
            this.busCat=res.data        
            console.log('this.busCat')
            console.log(this.busCat)
          }
          console.log('hola')
          this.selectedCat = this.allCat.filter(category =>
            this.busCat.find(item => item.category === category.id_category) !== undefined);
          
          console.log(this.selectedCat)
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
          console.log(tf)
          console.log(tfMod)
          this.timeFrameArray.push(tfMod)
        }
      }

      //opciones extra del negocio a editar
      this.optionsService.getBusinessOpt(+id).subscribe((res:ResponseBusOpt)=>{
        if (res.error){
          console.log('error')
          alert(res.error)
        }else{    
          for  (let i=0; i<res.data.length;i++){
            this.selectedOptions.push(res.data[i].id_options)
          }
          console.log(res.data)
          console.log(this.selectedOptions)
        }
      })

    
  //tests
    console.log('negocio')
    console.log(this.business)
    console.log('servicios')
    console.log(this.services)
    console.log('timeframes')
    console.log(this.timeframes)
    console.log('catds')
    console.log(this.selectedCat)
    
  })

  

    
      
 
 


  

    
  })


    //para que el formulario coja por defecto los valores del servici a editar
    this.selectedCat = this.business.tags;
    //pendiente de ver como seleccionar de iniciolas que ya tenga el negocio
    this.editBusinessForm.patchValue({
      title: this.business.title,
    });
  }
}
