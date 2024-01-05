import { Component, OnInit } from '@angular/core';

import { BusinessService } from 'src/app/shared/business.service';
import { UserService } from 'src/app/shared/user.service';
import { User } from 'src/app/models/user';
import { Business } from 'src/app/models/business';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HeaderNavbarService } from 'src/app/shared/header-navbar.service';
import { Service} from 'src/app/models/service';
import { Location } from '@angular/common';
import { ActivatedRoute, Router, RouterStateSnapshot, RoutesRecognized  } from '@angular/router'
import { ResponseBusiness } from 'src/app/models/response-business';
import { TimeframeService } from 'src/app/shared/timeframe.service';
import { ResponseTimeframe } from 'src/app/models/response-timeframe';
import { TimeFrame } from 'src/app/models/time-frame';
import { ServiceService } from 'src/app/shared/service.service';
import { ResponseService } from 'src/app/models/response-service';
import { BookingService } from 'src/app/shared/booking.service';
import { ResponseBooking } from 'src/app/models/response-booking';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-book-service',
  templateUrl: './book-service.component.html',
  styleUrls: ['./book-service.component.css'],
})
export class BookServiceComponent implements OnInit {
  bookingForm: FormGroup;

  minDate: string;
  today = new Date();
  user:User=this.userService.user
  
  selectedDate;
  providerId:number

  business: Business = this.businessService.business;

  service: Service 
  duration: number
  
  weekDay:string

  clientList: User[] = [this.userService.user1];

  //por si viene de reserva manual
  dateTimeData:string
  inputDate
  inputTime
  inputTime0
  inputTime1

  // creo un array de horas disponibles, falta toda la lógica de cómo vamos a ver qué franjas están disponibles
  availableTimeframes = [
  ];



  busTfs:TimeFrame[]

  selectedClient: User | null = null; // Inicializa selectedClient con null
  constructor(
    private userService: UserService,
    private businessService: BusinessService,
    private timeframeService:TimeframeService,
    private formBuilder: FormBuilder,
    public headerNavbarService: HeaderNavbarService,
    private location: Location,
    private route: ActivatedRoute,
    private serviceService: ServiceService,
    private bookingService: BookingService, private router:Router
  ) {
    this.headerNavbarService.showHeader = true;
    this.headerNavbarService.showNavbar = true;
    this.buildForm();
    this.minDate = this.today.toISOString().split('T')[0];
  }

  closeForm(): void {
    this.location.back();
  }

  private buildForm() {

    this.bookingForm = this.formBuilder.group({
      date: [, [Validators.required, this.dateAvailable]],
      time: [, [Validators.required]],
      user: [, this.addRequired()],
      comment: [, []],
    });
  }

  dateAvailable(){

  }
  //Fechas
  onDateChange(event: any) {
    const selectedDate = event.target.value;
    const dayOfWeek = this.getDayOfWeek(selectedDate);
    this.weekDay=dayOfWeek
    this.availableTimeframes=[]
    console.log(dayOfWeek);
    this.getDayTf(this.weekDay)
  }

  private getDayOfWeek(dateString: string): string {
    const daysOfWeek = ['D', 'L', 'M', 'X', 'J', 'V', 'S'];
    const date = new Date(dateString);
    const dayIndex = date.getDay();
    return daysOfWeek[dayIndex];
  }

  getDayTf(day:string){
    const appTf = this.busTfs.filter(tf => tf.days.includes(day))
    console.log(appTf)
    if (appTf.length===0){
      
      this.availableTimeframes.push({time: "Día seleccionado", available: false})
    }else{
      // let duration = this.service.duration
      console.log('aqui')
      for (let tf of appTf){
        console.log('aca')
        const startDateTime = new Date(`1970-01-01T${tf.start}`);
      const endDateTime = new Date(`1970-01-01T${tf.end}`);
      const durationInMillis = this.duration * 60 * 1000;

    
    let currentDateTime = startDateTime;

    while (currentDateTime.getTime() + durationInMillis <= endDateTime.getTime()) {
      let time0=currentDateTime.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', hour12: false });
      // console.log(this.availableTimeframes)
      currentDateTime = new Date(currentDateTime.getTime() + durationInMillis);
      let time1=currentDateTime.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', hour12: false });
      this.availableTimeframes.push({time0:time0, time1: time1, available: true})
    }
      }
    }

  }

  private addRequired() {
    let validators = [];
    console.log(this.user.id_user === this.providerId);
    if (this.user.id_user === this.providerId) {
      validators.push(Validators.required);
    }
     ;
    return validators;
  }



  bookBusiness() {
    let newBooking = this.bookingForm.value;

    newBooking.service = this.service.id_service;
    if (this.user.id_user !== this.providerId){
      newBooking.user = this.user.id_user
    }
    newBooking.cancelled=0

    console.log(newBooking);
    this.bookingService.postBooking(newBooking).subscribe((res:ResponseBooking)=>{
      if(res.error){
        console.log('error')
        alert(res.error)
      }else{
        Swal.fire({        
          title: "Reserva completada",
          text: "Puedes consultar la información en tu calendario",
          icon: "success",        
          confirmButtonColor: "var(--green)",
          confirmButtonText: "OK",
         
        }).then((result)=>{
          this.dateTimeData=null
          this.bookingService.resetDateTimeData()
          if (result.isConfirmed){
            this.router.navigate(['/calendar'])
          }
        })
        
      }
    })
  }

  ngOnInit() {
    const id_service = this.route.snapshot.paramMap.get('id_service');
    const id_business = this.route.snapshot.paramMap.get('id_business');
    console.log(id_service)
    console.log(id_business)
   
    

    //datos del negocio
    this.businessService.getBusinessById(+id_business).subscribe((res:ResponseBusiness)=>{
      if (res.error){
        console.log('error')
        alert(res.error)
      }else{    
        this.business=res.data[0]
        this.providerId=this.business.provider
     

        //datos del servicio
        this.serviceService.getOneService(+id_service).subscribe((res:ResponseService)=>{
          if (res.error){
            console.log('error')
            alert(res.error)
          }else{
            this.service=res.data[0]
            this.duration = this.service.duration

            
        //si viene con fecha de booking manual
        this.dateTimeData=this.bookingService.getDateTimeData()
        if (this.dateTimeData){
          const dateObject = new Date(this.dateTimeData)
             
          this.inputDate = dateObject.toISOString().split('T')[0];  
          this.inputTime = dateObject.toISOString().split('T')[1].split('+')[0]; 
    
          const timeObject0 = new Date(`1970-01-01T${this.inputTime}`)

          console.log(this.inputDate)
          console.log(this.inputTime)
    
          if (this.inputDate !== undefined) {
            this.bookingForm.get('date')?.setValue(this.inputDate);
            const fakeEvent = { target: { value: this.inputDate } };
          this.onDateChange(fakeEvent);
          }
    
          if (this.inputTime !== undefined) {
            
            const durationInMillis = this.duration * 60 * 1000;
            this.inputTime0 = timeObject0.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', hour12: false })
            const timeObject1 = new Date (timeObject0.getTime() + durationInMillis)
            this.inputTime1=timeObject1.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', hour12: false })
            
            console.log(this.duration)
            console.log(durationInMillis)
            console.log('TimeObject0 '+ timeObject0)
            console.log('TimeObject0 '+ timeObject0)
            console.log('time0 '+ this.inputTime0)
            console.log('time1 '+ this.inputTime1)
          
            this.bookingForm.get('time')?.setValue(this.inputTime0);
          }
        }
          }
        })


        //timeframes
        this.timeframeService.getBusinessTimeframe(+id_business).subscribe((res:ResponseTimeframe)=>{
          if (res.error){
            alert(res.error)
          }else{
            this.busTfs=res.data
            console.log(this.busTfs)
          }
        })
    }})

    this.user = this.userService.user
  
    // business: Business = this.businessService.business;
    
    // this.provider = this.businessService.provider;
  
  
    // service: Service = this.business.services[0];

    this.clientList = [this.userService.user1];
    this.headerNavbarService.showHeader = true;
    this.headerNavbarService.showNavbar = true;
    this.userService;
  }
}
