import { Component, OnInit } from '@angular/core';
import { CalendarOptions, EventClickArg  } from '@fullcalendar/core';
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
import Swal from 'sweetalert2';



@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
 
  calendarOptions: any = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, interactionPlugin,timeGridPlugin ],
    locale:'es-ES',
    headerToolbar: {      
      left: '',
      center: 'title',
      right: ''      
    },
    footerToolbar: {     
      left: 'prev',
      center: 'today',
      right: 'next'
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
    
    eventTextColor:'var(--dark)',
    
    events:[],
    eventClick: this.handleEventClick.bind(this),
   
  }

user: number
allBookings: Booking[]
servId: number
busId: number
titleServ: string
titleBus:string
duration:number
photoBus:string





  calendarInitialized(calendar: Calendar) {
    //no entiendo muy bien que hace, pero sin esto no funciona
     console.log('Calendar initialized', calendar);
  }

  openDate(arg: any) {
    console.log('Date clicked: ' + arg.dateStr);
    this.calendarInitialized(arg.view.calendar);
    arg.view.calendar.changeView('timeGridDay', arg.date);
   
  }

  handleEventClick(arg: EventClickArg) {
    // Aquí puedes ejecutar el código que desees cuando se hace clic en un evento
    console.log('Evento clickeado:', arg.event);
    
    Swal.fire({        
      title: `${arg.event.title}`,

      html: `
      <div class="img-container" *ngIf="photoBus" style= "width: 300px; height: 170px; overflow: hidden; position:relative; margin-bottom:1rem">
        <img  src="${this.photoBus}" alt="Imagen" style="width: 100%; height:100%; object-fit: cover; border-radius: .625rem;"/>
      </div>
     <p>Reserva: ${arg.event.extendedProps.day} a las ${arg.event.extendedProps.time}</p>
     <p >Comentario: ${arg.event.extendedProps.comment}</p>
     
    `,
      showCloseButton: true,
      confirmButtonColor: "var(--red)",
      confirmButtonText: "Cancelar reserva"
      
    }).then((result) => {
      if (result.isConfirmed){
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
            this.bookingService.deleteBooking(arg.event.extendedProps.bookId).subscribe((res:ResponseBooking)=>{
              if (res.error){
                console.log('error')
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
                  console.log('navigate')
                  this.calendarOptions.events = []
                  this.ngOnInit()
                })
              }
            })
          }
        })
      }

    })




    // Puedes acceder a la información del evento, por ejemplo:
    const title = arg.event.title;
    const start = arg.event.start;
    const end = arg.event.end;
    const comentario = arg.event.extendedProps.comentario;

    // Ejecuta tu código aquí...
  }


  onViewDidMount(arg: any) {
    this.updateFooter(arg.view.type);
  }

  updateFooter(viewType: string) {
    const footerToolbar = this.calendarOptions.footerToolbar;

    if (viewType === 'dayGridMonth') {
      // Establecer encabezado para la vista de mes
      footerToolbar.start = 'prev';
      footerToolbar.center = 'today';
      footerToolbar.end = 'next';
    } else if (viewType === 'timeGridDay') {
      // Establecer encabezado para la vista de día
      footerToolbar.start = 'prev';
      footerToolbar.center = 'dayGridMonth';
      footerToolbar.end = 'next';
    }

    // Actualizar las opciones del calendario con el nuevo encabezado
    this.calendarOptions.footerToolbar = { ...footerToolbar };
  }
goBack(){
  this.router.navigate(['/'])
}
  


  constructor(private router: Router, public headerNavbarService: HeaderNavbarService, private userService: UserService, private bookingService: BookingService, private businessService: BusinessService, private serviceService: ServiceService) { 
    this.headerNavbarService.showHeader=false
    this.headerNavbarService.showNavbar=false
    this.user = this.userService.user.id_user
  }




  ngOnInit(){
    //recoger todos los eventos
    //reservas en servicios proporionados por el usuario



    //reservados por el usuario
    this.bookingService.getUserBookings().subscribe((res:ResponseBooking)=>{
      
      if (res.error){
        console.log('error')
        alert(res.error)
      }else{    
        this.allBookings=res.data
        console.log(this.allBookings)
        if (this.allBookings.length>0){
          for (let booking of this.allBookings){
            let comment:string = 'Sin comentarios'
            let provider: number
            if(booking.comment){
              comment=booking.comment}
           
          
          //datos del negocio/servicio
          this.serviceService.getOneService(booking.service).subscribe((res:ResponseService)=>{
            if (res.error){
              console.log('error')
              alert(res.error)
            }else{    
              this.servId = res.data[0].id_service
              this.titleServ=res.data[0].title
              this.duration=res.data[0].duration
              this.busId = res.data[0].id_business
              
              this.businessService.getBusinessById(this.busId).subscribe((res:ResponseBusiness)=>{
                if(res.error){
                  console.log('error')
                  alert(res.error)
                }else{  
                  this.titleBus = res.data[0].title
                  this.photoBus=res.data[0].photo
                  provider = res.data[0].provider


                  
                  const eventDateStart = new Date(booking.date)
               const [h, m, s]=booking.time.split(':')
               eventDateStart.setHours(parseInt(h,10))
               eventDateStart.setMinutes(parseInt(m,10))
               eventDateStart.setSeconds(parseInt(s,10))
         
               console.log(eventDateStart)
     
               const eventDateEnd = new Date(eventDateStart);
               eventDateEnd.setMinutes(eventDateEnd.getMinutes() + this.duration);
     
              let color:string = provider === this.user ? 'var(--green)': 'var(--blue) '
               const newEvent = {
                   title: `${this.titleBus} - ${this.titleServ}`,
                   start: eventDateStart,  // Fecha de inicio del evento (puedes personalizar esto)
                   end: eventDateEnd,   // Fecha de fin del evento (puedes personalizar esto)
                   extendedProps:{

                     comment: comment,
                     day: `${(eventDateStart.getDate() + '').padStart(2, '0')}/${(eventDateStart.getMonth() + 1 + '').padStart(2, '0')}/${eventDateStart.getFullYear()}`,
                     time: eventDateStart.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }),
                     bookId: booking.id_booking,
                     provider: provider
                   },
                   color: color,
                  //  eventColor: color,
                  //   eventBorderColor: color,

                   
                 };
                 console.log(newEvent)
             
                 // Agrega el nuevo evento a la lista de eventos
                 this.calendarOptions.events = [...this.calendarOptions.events, newEvent];
                }
              })
            }
          })

        }
        
        }
      }
    })

    //crear los eventos en el calendario


  }

};
  

