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
import { Router } from '@angular/router';
import { HeaderNavbarService } from 'src/app/shared/header-navbar.service';
import { CommonModule } from '@angular/common';

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

  //Importa las categorías del negocio 'business'
  allCat = this.businessService.allCat;
  selectedCat: Category[];

  //opciones adicionales: pago en efcetivo, negocio a domicilio, etc
  opt1 = { value: 'Servicio a domicilio', icon: 'fa-solid fa-house' };
  opt2 = { value: 'Pago en efectivo', icon: 'fa-solid fa-coins' };
  opt3 = { value: 'Pago con tarjeta', icon: 'fa-regular fa-credit-card' };
  opt4 = { value: 'Otra opción extra', icon: 'fa-solid fa-face-grin-stars' };

  allOptions = [this.opt1, this.opt2, this.opt3, this.opt4];
  selectedOptions: string[] = [];

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

  timeFrameArray = [this.tf1, this.tf2, this.tf3, this.tf4];

  constructor(
    public userService: UserService,
    public businessService: BusinessService,
    private formBuilder: FormBuilder,
    private router: Router,

    public headerNavbarService: HeaderNavbarService,
    private commonModule: CommonModule
  ) {
    this.headerNavbarService.showHeader = false;
    this.headerNavbarService.showNavbar = false;
    this.buildFormServices();
    this.buildFormBusiness();
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

    console.log(this.selectedOptions);
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

    if (!category.selected) {
      this.selectedCat.push(category);
    } else {
      this.selectedCat.splice(i, 1);
    }
    category.selected = !category.selected;
    console.log(this.selectedCat);
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

  ngOnInit() {
    //para que el formulario coja por defecto los valores del servici a editar
    this.selectedCat = this.business.tags;
    //pendiente de ver como seleccionar de iniciolas que ya tenga el negocio
    this.editBusinessForm.patchValue({
      title: this.business.title,
    });
  }
}
