import { Component } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { Calendar } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { Router } from '@angular/router';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent {
   
 

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
      
  }

  calendarInitialized(calendar: Calendar) {
    //no entiendo muy bien que hace, pero sin esto no funciona
     console.log('Calendar initialized', calendar);
  }

  openDate(arg: any) {
    console.log('Date clicked: ' + arg.dateStr);
    // Ahora puedes acceder a la instancia de Calendar
    this.calendarInitialized(arg.view.calendar);
    arg.view.calendar.changeView('timeGridDay', arg.date);
    // Aquí puedes agregar la lógica que deseas ejecutar cuando se hace clic en un día
  }

  // goToMonthView() {
  //   console.log('entra');
  //   this.calendarComponent.fullCalendar('changeView', 'dayGridMonth');
  //   this.updateFooter('dayGridMonth');
  // }

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
  constructor(private router: Router) { }
};
  

