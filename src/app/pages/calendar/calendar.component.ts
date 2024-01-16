import { Component, OnInit, } from '@angular/core';
import { CalendarOptions, EventClickArg, DateSelectArg  } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { Calendar } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { Router } from '@angular/router';
import { HeaderNavbarService } from 'src/app/shared/header-navbar.service';
import { UserService } from 'src/app/shared/user.service';
import { BookingService } from 'src/app/shared/booking.service';
import { ResponseBooking } from 'src/app/models/response-booking';
import { Booking } from 'src/app/models/booking';
import { BusinessService } from 'src/app/shared/business.service';
import { ServiceService } from 'src/app/shared/service.service';
import { ResponseService } from 'src/app/models/response-service';
import { ResponseBusiness } from 'src/app/models/response-business';
import { Business } from 'src/app/models/business';
import Swal from 'sweetalert2';
import { Service } from 'src/app/models/service';
import {Location} from '@angular/common';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
 
  calendarOptions: any = {
    initialView: 'dayGridMonth',
   
    allDaySlot: false,
    plugins: [dayGridPlugin, interactionPlugin,timeGridPlugin ],
    locale:'es-ES',
    headerToolbar: {      
      left: '',
      center: 'title',
      right: ''      
    },
    footerToolbar: {     
      left: '',
      center: 'prev,today,next',
      right: ''
        },
    editable: true,
    dateClick: this.openDate.bind(this),
    
    viewDidMount: this.onViewDidMount.bind(this),
    timeFormat: {
      hour: '2-digit',
      minute: '2-digit',
      omitZeroMinute: false,
      meridiem: false
    },
    slotLabelFormat: {
      hour: '2-digit',
      minute: '2-digit',
      omitZeroMinute: false,
      meridiem: false
    },
    buttonText: {
      today: 'Hoy',
      month: 'Mes'},
    firstDay: 1,
    contentHeight: '',
    eventTextColor:'var(--dark)',
    
    events:[],
    eventClick: this.handleEventClick.bind(this),
    

  }

user: number
allBookings: Booking[]

//datos de negocios del usuario para que en caso de querer hacer reserva manual
userBusiness: Business[]
businessListString:string =`<select id="businessSelect">\n`
userBusinessService:Service[]
serviceListString:string =`<select id="serviceSelect">\n`
dateTimeData :string

serviceToRate:number
serviceProvider:number
businessToRate:number

ratingWindowOpen:boolean=false

  calendarInitialized(calendar: Calendar) {
    //no entiendo muy bien que hace, pero sin esto no funciona
  }

  openDate(arg: any) {
    if (arg.view.type === 'timeGridDay') {
      // Ejecutar acciones específicas para la vista 'timeGridDay'
      this.dateTimeData =arg.dateStr
      this.manualBooking()

    }else{
       
      this.calendarInitialized(arg.view.calendar);
      arg.view.calendar.changeView('timeGridDay', arg.date);   
    }

    }

  manualBooking(){
    


    Swal.fire({
      title: "Selecciona el negocio",
      html:this.businessListString,
      showCancelButton: true,
      confirmButtonText: 'Continuar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: "var(--green)",
      cancelButtonColor: "var(--red)",
 
      preConfirm: () => {
        const selectedValue = (document.getElementById('businessSelect') as HTMLSelectElement).value;
        return selectedValue;
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const sendBusId = result.value;
        // obtener todos los servicios de el negocio seleccionado
        this.serviceService.getAllServices(+sendBusId).subscribe((res:ResponseService)=>{
          if (res.error){
            alert(res.error)
          }else{            
            this.userBusinessService=res.data        
            if (this.userBusinessService.length>0){
              for (let serv of this.userBusinessService){
                let str = `<option value=${serv.id_service}>${serv.title}</option>\n`
                this.serviceListString += str
              }
            this.serviceListString += '</select>'
            }

            Swal.fire({
              title: "Selecciona el servicio",
              html:this.serviceListString,
              showCancelButton: true,
              confirmButtonText: 'Continuar',
              cancelButtonText: 'Cancelar',
              confirmButtonColor: "var(--green)",
              cancelButtonColor: "var(--red)",
         
              preConfirm: () => {
                const selectedValue = (document.getElementById('serviceSelect') as HTMLSelectElement).value;
                return selectedValue;
              },
            }).then((result)=>{
              if (result.isConfirmed){
                const sendServId = result.value;

                this.bookingService.setDateTimeData(this.dateTimeData);
               
                this.router.navigate(['/book-service',sendBusId, sendServId])
              }
            })


          }
        })



      }
    });

    
  
  }



  

  handleEventClick(arg: EventClickArg) {
    // Aquí puedes ejecutar el código que desees cuando se hace clic en un evento
    
    this.serviceToRate = arg.event.extendedProps.id_service
    this.businessToRate=arg.event.extendedProps.id_business
    this.serviceProvider=arg.event.extendedProps.provider
    
    

    const bookingDate:Date=arg.event.start
    const now :Date = new Date()    
    const diffTime: number = (bookingDate.getTime() - now.getTime()) / (1000 * 60 * 60);
  

    //si quedan más de 24h se puede cancelar
    let buttonColor
    let buttonText
    if(diffTime>0){
      buttonColor = "var(--red)"
     buttonText = "Cancelar reserva"
    }else{
      buttonColor = "var(--green)"
     buttonText = "Valorar servicio"
    }
    Swal.fire({        
      title: `${arg.event.title}`,

      html: `
      <div class="img-container" *ngIf="photoBus" style= "width: 300px; height: 170px; overflow: hidden; position:relative; margin-bottom:1rem">
        <img  src="${arg.event.extendedProps.url}" alt="Imagen" style="width: 100%; height:100%; object-fit: cover; border-radius: .625rem;"/>
      </div>
      <p>Reserva: ${arg.event.extendedProps.day} a las ${arg.event.extendedProps.time}</p>
      <p >Comentario: ${arg.event.extendedProps.comment}</p>`,
      showCloseButton: true,
      confirmButtonColor: buttonColor,
      confirmButtonText: buttonText
      
    }).then((result) => {
      if (result.isConfirmed && diffTime>=24){
        Swal.fire({        
          title: "¿Seguro?",
          text: "Esta acción no se puede deshacer",
          icon: "warning",
          showCancelButton: true,          
          confirmButtonColor: "var(--green)",
          cancelButtonColor: "var(--red)",
          confirmButtonText: "No, volver",
          cancelButtonText: "Sí, eliminar"
        }).then((result)=>{
          if (!result.isConfirmed){
            // this.bookingService.deleteBooking(arg.event.extendedProps.bookId).subscribe((res:ResponseBooking)=>{

            let bk = this.allBookings.filter(b => b.id_booking === arg.event.extendedProps.bookId)[0]
            this.bookingService.cancelBooking(bk).subscribe((res:ResponseBooking)=>{
              if (res.error){
                alert(res.error)
              }else{
                const index = this.calendarOptions.events.indexOf(arg.event);
            if (index !== -1) {
              this.calendarOptions.events.splice(index, 1);
              
            }
                Swal.fire({        
                  title: "Cita eliminada",
                  text: "Tu reserva se ha eliminado correctamente",
                  icon: "success",        
                  confirmButtonColor: "var(--green)",
                  confirmButtonText: "OK",                 
                }).then(()=>{
                  this.calendarOptions.events = []
                  this.ngOnInit()
                })
              }
            })
          }
        })
      }else if (result.isConfirmed && diffTime<0){
        //pendinete logica valoraciones
        if(this.user===this.serviceProvider){          
          Swal.fire({        
            title: "¡No hagas trampas!",
            text: "No puedes valorar un servicio del que eres proveedor",
            icon: "error",         
            confirmButtonColor: "var(--green)",          
            confirmButtonText: "OK",
            
          })
        }else{          
          this.ratingWindowOpen=true    
          
        }


        

      }else if (result.isConfirmed && diffTime<24){
        Swal.fire({        
          title: "Imposible anular cita",
          text: "Las reservas no se pueden cancelar automáticamente con menos de 24 horas de antelación. Ponte en contacto con el vendedor si no vas a poder acudir a la cita.",
          icon: "error",         
          confirmButtonColor: "var(--green)",          
          confirmButtonText: "OK",
          
        })
      }

    })




    // Puedes acceder a la información del evento, por ejemplo:
    const title = arg.event.title;
    const start = arg.event.start;
    const end = arg.event.end;
    const comentario = arg.event.extendedProps.comentario;

  
  }

  navString:string

  onViewDidMount(arg: any) {
    this.updateFooter(arg.view.type);
    
  }

  updateFooter(viewType: string) {
    const footerToolbar = this.calendarOptions.footerToolbar;

    if (viewType === 'dayGridMonth') {
      // Establecer encabezado para la vista de mes
      footerToolbar.start = '';
      footerToolbar.center = 'prev,today,next';
      footerToolbar.end = '';
      this.calendarOptions.contentHeight='auto'
      this.navString='/'

    } else if (viewType === 'timeGridDay') {
      // Establecer encabezado para la vista de día
      footerToolbar.start = '';
      footerToolbar.center = 'prev,dayGridMonth,next';
      footerToolbar.end = '';
      this.calendarOptions.contentHeight='420px'
      this.navString='calendar'
     
      
    }

    // Actualizar las opciones del calendario con el nuevo encabezado
    this.calendarOptions.footerToolbar = { ...footerToolbar };
  }

  goBack(){
    this._location.back();
  }


  constructor(private router: Router, public headerNavbarService: HeaderNavbarService, private userService: UserService, private bookingService: BookingService, private businessService: BusinessService, private serviceService: ServiceService, private _location:Location) { 
    this.headerNavbarService.showHeader=false
    this.headerNavbarService.showNavbar=false
    if(this.userService.connected){

      this.user = this.userService.user.id_user
    }
  }

  onRatingWindowOpenChange(value: boolean) {
    this.ratingWindowOpen = value;
  }

  ngOnInit(){
    //si no estás logeado redirigir

    if(!this.userService.connected){
      this.router.navigate(['/'])
    }else{

    

    //recoger todos los eventos
     //reservados por el usuario
    this.bookingService.getUserBookings(this.userService.user.id_user).subscribe((res:ResponseBooking)=>{
      
      if (res.error){
        alert(res.error)
      }else{   
        this.allBookings=res.data
        if (this.allBookings.length>0){
          for (let booking of this.allBookings){
            if(booking.canceled===0){

              
              let comment:string = 'Sin comentarios'
              let provider: number
              let photoBus: string = '../../../assets/img/logo_booking.png' 
              let servId: number
              let busId: number
              let titleServ: string
              let titleBus:string
              let duration:number
              if(booking.comment){
                comment=booking.comment}          
                
                //datos del negocio/servicio
                this.serviceService.getOneService(booking.service).subscribe((res:ResponseService)=>{
                  if (res.error){
                    alert(res.error)
                  }else{    
                    servId = res.data[0].id_service
                    titleServ=res.data[0].title
                    duration=res.data[0].duration
                    busId = res.data[0].id_business
                    
                    this.businessService.getBusinessById(busId).subscribe((res:ResponseBusiness)=>{
                      if(res.error){
                        alert(res.error)
                      }else{  
                        titleBus = res.data[0].title
                        if (res.data[0].photo){
                          photoBus=res.data[0].photo
                        }
                        provider = res.data[0].provider
                        const eventDateStart = new Date(booking.date)
                        const [h, m, s]=booking.time.split(':')
                        eventDateStart.setHours(parseInt(h,10))
                        eventDateStart.setMinutes(parseInt(m,10))
                        eventDateStart.setSeconds(parseInt(s,10)) 
                        const eventDateEnd = new Date(eventDateStart);
                        eventDateEnd.setMinutes(eventDateEnd.getMinutes() + duration);     
                        let color:string = provider === this.user ? 'var(--green)': 'var(--blue) '
                        const newEvent = {
                          title: `${titleBus} - ${titleServ}`,
                          start: eventDateStart,  // Fecha de inicio del evento (puedes personalizar esto)
                          end: eventDateEnd,   // Fecha de fin del evento (puedes personalizar esto)
                          extendedProps:{
                            comment: comment,
                            day: `${(eventDateStart.getDate() + '').padStart(2, '0')}/${(eventDateStart.getMonth() + 1 + '').padStart(2, '0')}/${eventDateStart.getFullYear()}`,
                            time: eventDateStart.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }),
                            bookId: booking.id_booking,
                            provider: provider,
                            url: photoBus,
                            id_service: servId,
                            id_business: busId
                            
                          },
                          color: color,
                          //  eventColor: color,
                          //   eventBorderColor: color,
                        }; 
                        // Agrega el nuevo evento a la lista de eventos
                        this.calendarOptions.events = [...this.calendarOptions.events, newEvent];
                      }
                    })
                  }
                })
              }

        }
        
        }
      }
    })
  
    this.businessService.getBusiness(this.userService.user.id_user).subscribe((res:ResponseBusiness)=>{
      if (res.error){
          alert(res.error)
      }else{
        this.userBusiness=res.data
        if (this.userBusiness.length>0){
          for (let bus of this.userBusiness){
            let str = `<option value=${bus.id_business}>${bus.title}</option>\n`
            this.businessListString += str
            
          }
          this.businessListString += '</select>'
        }
      }
    })


  }
  } //fin onoInit

  

};
  

