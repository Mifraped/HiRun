import { Component, NgZone, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { Category } from 'src/app/models/category';
import { BusinessService } from 'src/app/shared/business.service';
import { UserService } from 'src/app/shared/user.service';
import { Service} from 'src/app/models/service';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
  FormControl,NgModel
  
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
import { ResponseImg } from 'src/app/models/response-img';
import { PhotoService } from 'src/app/shared/photo.service';
import { ResponsePhoto } from 'src/app/models/response-photo';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';
declare var google: any;

@Component({
  selector: 'app-edit-business',
  templateUrl: './edit-business.component.html',
  styleUrls: ['./edit-business.component.css'],
})
export class EditBusinessComponent implements OnInit {
  @ViewChild('addressNgModel') addressNgModel: NgModel;
  
  business = this.businessService.business;
  services: Service[] = this.business.services;
  initialOptions:BusinessOpt[] = []


  //almacenar aparte los cambios para editar después
  newServices:Service[]=[]
  editServices:Service[]=[]
  deleteServices:Service[]=[]
//mapa
addressControl = new FormControl();
autocomplete: any;
//

  selectedService: Service;

  public fileToUpload: File = null;
public imagePreview: string;
photoUrl
  selectedImageUrl: string | null=null

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

  imageUrl:string

  
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
    public optionsService:OptionService,
    public photoService:PhotoService, public http:HttpClient,  private zone: NgZone, private cdr: ChangeDetectorRef, private _location:Location
    
  ) {
    this.headerNavbarService.showHeader = false;
    this.headerNavbarService.showNavbar = false;
    this.buildFormServices();
    this.buildFormBusiness();
    if (this.userService.connected){
      this.user = this.userService.user;
    }
    
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
//foto
  onFileSelected(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.fileToUpload = event.target.files[0];
  
      const reader = new FileReader();
      reader.onload = e => this.imagePreview = reader.result as string;
  
      reader.readAsDataURL(this.fileToUpload);
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
      address:[,]
    });
  }

  initAutocomplete() {
    // Inicializa el servicio de autocompletado de Google Maps
    this.autocomplete = new google.maps.places.Autocomplete(
      document.getElementById('address'),
      { types: ['geocode'] }
    );
  
    // Escucha el evento de selección de un lugar y actualiza el formulario
    this.autocomplete.addListener('place_changed', () => {
      this.zone.run(() => {
        const place = this.autocomplete.getPlace();
        this.editBusinessForm.patchValue({ address: place.formatted_address });
        this.cdr.detectChanges(); // Notifica a Angular sobre el cambio
      });
    });
  }
  coordValue:string = ''
  async convertAddressToCoordinates(address: string):Promise<string> {
    const geocoder = new google.maps.Geocoder();
    await geocoder.geocode({ 'address': address }, (results, status) => {
      if (status === 'OK' && results[0]) {
        const coordinates = {
          lat: results[0].geometry.location.lat(),
          lng: results[0].geometry.location.lng()
        };
        this.coordValue= `{"latitude":${coordinates.lat}, "longitude": ${coordinates.lng}}`
        // Aquí puedes enviar las coordenadas al servidor o realizar cualquier acción necesaria
      } else {
        console.error('Error al convertir la dirección a coordenadas:', status);
        
      }
    });
    return this.coordValue
  }
  
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
              alert('error')
              
            }else{
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
        
      })
      }
      
    }
  }

  serviceAddition(){
    for (let service of this.newServices){
      this.serviceService.postService(service).subscribe((res:ResponseService)=>{
      
        if (res.error){
          Swal.fire({
            icon:'error',
            title: 'Se ha producido un error',
            timer: 1500,
            showCancelButton:false,
            showConfirmButton:false
          })
        }
      })
    }
  }

  addNewTimeFrame(tf:TimeFrame){  
    this.timeframeService.postTimeframe(tf).subscribe((res:ResponseTimeframe)=>{
   
      if (res.error){Swal.fire({
        icon:'error',
        title: 'Se ha producido un error',
        timer: 1500,
        showCancelButton:false,
        showConfirmButton:false
      })
      }
    })
  }

  async addPhoto() {
    return new Promise<void>((resolve, reject) => {
      const fileExtension = this.fileToUpload.name.split('.').pop();
      const uniqueFileName = `photo_${Date.now()}.${fileExtension}`;
  
    
  
      const formData = new FormData();
      formData.append('photo', this.fileToUpload, uniqueFileName);
  
      this.photoService.uploadPhoto(formData).subscribe((resp: ResponsePhoto) => {
        if (resp.error === false) {
          this.photoUrl = resp.data;
          resolve(); // Resuelve la promesa cuando la carga de la foto es exitosa
        } else {
          reject(new Error('Error al cargar la foto')); // Rechaza la promesa en caso de error
        }
      });
    });
  }

//direccion a coordenadas




  //editar negocio con la info del form + info adicional que viene del negocio, del formulario de services, etc. falta lógica solo recoge datos
  async editBusiness() {

    console.log('entra')

    if (this.services.length==0){  
      this.addServiceForm.get('title').markAsTouched()
      Swal.fire({
        title: "ERROR",
        text: "El negocio debe incluir al menos un servicio",
        icon: "error",
        confirmButtonColor: "var(--green)",
        confirmButtonText: "OK"
      })
    }else {  
     
      let timeFrameConfirmation = true;

      Swal.fire({        
        title: "¿Seguro?",
        text: "Esta acción es irreversible",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "var(--green)",
        cancelButtonColor: "var(--red)",
        confirmButtonText: "Publicar cambios",
        cancelButtonText: "Cancelar"
      }).then( async(result) => {
        if (result.isConfirmed) {
          if (this.timeFrameArray.length===0){
            timeFrameConfirmation = await Swal.fire({
              title: "No has indicado horarios",
              text: "Si dejas así tu negocio, deberás gestionar las reservas personalmente",
              icon: "warning",
              confirmButtonColor: "var(--green)",
              confirmButtonText: "Continuar",
              showCancelButton: true,
              cancelButtonText: "Cancelar"
            }).then(async (result)=>{
              if (result.isDenied){
                Swal.fire("Changes are not saved", "", "info")
                return false;
              }else if (result.isConfirmed){
                return true;
              }
            })
          }}
        
          if (timeFrameConfirmation) {
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
                    Swal.fire({
                      icon:'error',
                      title: 'Se ha producido un error',
                      timer: 1500,
                      showCancelButton:false,
                      showConfirmButton:false
                    })
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
                  Swal.fire({
                    icon:'error',
                    title: 'Se ha producido un error',
                    timer: 1500,
                    showCancelButton:false,
                    showConfirmButton:false
                  })
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
                Swal.fire({
                  icon:'error',
                  title: 'Se ha producido un error',
                  timer: 1500,
                  showCancelButton:false,
                  showConfirmButton:false
                })
              }else{
               
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
                Swal.fire({
                  icon:'error',
                  title: 'Se ha producido un error',
                  timer: 1500,
                  showCancelButton:false,
                  showConfirmButton:false
                })               
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
                Swal.fire({
                  icon:'error',
                  title: 'Se ha producido un error',
                  timer: 1500,
                  showCancelButton:false,
                  showConfirmButton:false
                })
               
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
        //foto
        if(this.fileToUpload){
          await this.addPhoto()
        }

        //cambios en el propio business
        let modBusiness:Business =this.editBusinessForm.value
        
        if (modBusiness.address){
          modBusiness.address = await this.convertAddressToCoordinates(modBusiness.address) 
        }

        modBusiness.id_business=this.business.id_business
        modBusiness.photo=this.photoUrl      


        this.businessService.updateBusiness(modBusiness).subscribe((res:ResponseBusiness)=>{
          if (!res.error) {
            this.router.navigate([`/service-provided/${this.user.id_user}`]);
                   
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
          // if (res.error){
          //   Swal.fire({
          //   icon:'error',
          //   title: 'Se ha producido un error',
          //   timer: 1500,
          //   showCancelButton:false,
          //   showConfirmButton:false
          // })
            
          // }
        })
        //eliminar opciones
        this.optionsService.deleteAllBusinessOpt(id).subscribe((res:ResponseBusOpt)=>{
          // if (res.error){
          //   Swal.fire({
          //   icon:'error',
          //   title: 'Se ha producido un error',
          //   timer: 1500,
          //   showCancelButton:false,
          //   showConfirmButton:false
          // })
            
          // }
        })
        //eliminar categorías
        this.categoryService.deleteAllBusinessCat(id).subscribe((res:ResponseBusCat)=>{
          // if (res.error){
          //   Swal.fire({
          //   icon:'error',
          //   title: 'Se ha producido un error',
          //   timer: 1500,
          //   showCancelButton:false,
          //   showConfirmButton:false
          // })
            
          // }
        })
        //eliminar servicios
        this.serviceService.deleteAllService(id).subscribe((res:ResponseService)=>{
          // if (res.error){
          //   Swal.fire({
          //     icon:'error',
          //     title: 'Se ha producido un error',
          //     timer: 1500,
          //     showCancelButton:false,
          //     showConfirmButton:false
          //   })
          // }
        })
        //eliminar negocio
        this.businessService.deleteBusiness(id).subscribe((res:ResponseBusiness)=>{
          if (res.error){
            // Swal.fire({
            //   icon:'error',
            //   title: 'Se ha producido un error',
            //   timer: 1500,
            //   showCancelButton:false,
            //   showConfirmButton:false
            // })
          }else{
            this.router.navigate([`/service-provided/${this.user.id_user}`]);
           
          }
        })
        
        Swal.fire({
          title: "¡Eliminado!",
          text: "El negocio ha sido borrado.",
          icon: "success",
          confirmButtonColor: "var(--green)",
        });
      }
    });
  }


  cancelEditBusiness() {
    //PENDIENTE DEFINIR LÓGICA: pongo que vuelva al perfil
    this.editBusinessForm.reset();
    this.router.navigate([`/service-provided/${this.user.id_user}`]);
  }

  //Cambiar los días seleccionados - pendiente ver si se puede coger la info de lso timeframes
  daySelected(day) {
    day.selected = !day.selected;
  }

  ////funciones para ventana modal de timeframes
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

  // getImageUrl(imageName: string): string {
  //   return `${this.imageService.serverUrl}${imageName}`;
  // }




  ngOnInit() {
    if(!this.userService.connected){
      this.router.navigate(['/'])
    }
    this.initAutocomplete();
    const id = this.route.snapshot.paramMap.get('id_business');
      //datos del negocio
      this.businessService.getBusinessById(+id).subscribe((res:ResponseBusiness)=>{
      
        if (!res.error){
         
          this.business=res.data[0]
          //foto

          if(this.business.provider!=this.userService.user.id_user){
           
          //  this._location.back(); 
          this.router.navigate(['/'])
          }
  
          this.imageUrl=this.business.photo 
  
        
          this.editBusinessForm.patchValue({
            title: this.business.title,
          });
        }
      })

      
        

      

    //para obtener todas las categorías de la bbdd
    this.categoryService.getAllCat().subscribe((res:ResponseCategory)=>{
      if (res.error){
      }else{
        this.allCat=res.data
        // categorías del negocio a editar
        this.categoryService.getBusinessCat(+id).subscribe((res:ResponseBusCat)=>{
          if (!res.error){
           
            this.busCat=res.data 
          }
          this.selectedCat = this.allCat.filter(category =>
            this.busCat.find(item => item.category === category.id_category) !== undefined);
        })
      }
    })
      
  

    //servicios del negocio a editar
    this.serviceService.getAllServices(+id).subscribe((res:ResponseService)=>{
    
      if (!res.error){
        this.services=res.data
      }
    })
    //timeframes del negocio a editar
    this.timeframeService.getBusinessTimeframe(+id).subscribe((res:ResponseTimeframe)=>{
      if (res.error){
        Swal.fire({
          icon:'error',
          title: 'Se ha producido un error',
          timer: 1500,
          showCancelButton:false,
          showConfirmButton:false
        })
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
      if (!res.error){
        for  (let i=0; i<res.data.length;i++){
          this.selectedOptions.push(res.data[i].id_options)
          this.initialOptions.push(res.data[i])
          
        }
      }
    })

  
      
      
  }
}
