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
import { ChatService } from 'src/app/shared/chat.service';
import { ResponseChat } from 'src/app/models/response-chat';
import { Chat } from 'src/app/models/chat';
import { ResponseUser } from 'src/app/models/response-user';
import { Booking } from 'src/app/models/booking';
import { concatMap, forkJoin, of } from 'rxjs';

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

  chatList: Chat[] = []
  clientList: User[] = []

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
    private _location: Location,
    private route: ActivatedRoute,
    private serviceService: ServiceService,
    private bookingService: BookingService, private router:Router, private chatService: ChatService
  ) {
    this.headerNavbarService.showHeader = true;
    this.headerNavbarService.showNavbar = true;
    this.buildForm();
    this.minDate = this.today.toISOString().split('T')[0];
  }

  closeForm(): void {
    this._location.back();
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
  //para guardar la fecha seleccionada fuera de la función
  dateSelected:any
  onDateChange(event: any) {
    const selectedDate = event.target.value;
    this.dateSelected=selectedDate
    const dayOfWeek = this.getDayOfWeek(selectedDate);
    this.weekDay=dayOfWeek
    this.availableTimeframes=[]
    this.getDayTf(this.weekDay)
  }

  private getDayOfWeek(dateString: string): string {
    const daysOfWeek = ['D', 'L', 'M', 'X', 'J', 'V', 'S'];
    const date = new Date(dateString);
    const dayIndex = date.getDay();
    return daysOfWeek[dayIndex];
  }

  userAndProviderBookings: Booking[] = []
  filteredBookings:Booking[]=[]

  getDayTf(day:string){
    if (this.busTfs){
      const appTf = this.busTfs.filter(tf => tf.days.includes(day))
    
    if (appTf.length===0){
      if (this.availableTimeframes.length===0){

        this.availableTimeframes.push({time: "Día seleccionado", available: false})
      }
    }else{
      // let duration = this.service.duration
      
      //filtrar bookings previos por fecha
      this.filteredBookings=this.userAndProviderBookings.filter(b => {
        const bookingDate = new Date(b.date); 

        const formattedDate = `${bookingDate.getFullYear()}-${(bookingDate.getMonth() + 1).toString().padStart(2, '0')}-${bookingDate.getDate().toString().padStart(2, '0')}`;
      
        return formattedDate === this.dateSelected;
      })

    
      
    
      for (let tf of appTf){

      const startDateTime = new Date(`1970-01-01T${tf.start}`);
      const endDateTime = new Date(`1970-01-01T${tf.end}`);
      const durationInMillis = this.duration * 60 * 1000;

    
    let currentDateTime = startDateTime;

    while (currentDateTime.getTime() + durationInMillis <= endDateTime.getTime()) {
      let time0=currentDateTime.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', hour12: false });
      currentDateTime = new Date(currentDateTime.getTime() + durationInMillis);
      let time1=currentDateTime.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', hour12: false });

      //available true/false
      let isAvailable:boolean = true
     for (let fb of this.filteredBookings){

      const fbH: number = +fb.time.split(':')[0]*60
      const fbM: number =+fb.time.split(':')[1]
      const fbStart: number = fbH+fbM
      const fbEnd: number = fbStart + (+fb.duration)
      
      const t0:number = (+time0.split(':')[0]*60)+(+time0.split(':')[1])
      const t1:number = (+time1.split(':')[0]*60)+(+time1.split(':')[1])

      if(!(fbStart<t0 && fbEnd<=t0) && !(fbStart>=t1 && fbEnd>t1)){
        isAvailable=false
      }

     }    

      this.availableTimeframes.push({time0:time0, time1: time1, available: isAvailable})
    }
      }
    }
    }
    
  }

  private addRequired() {
    let validators = [];
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
    this.bookingService.postBooking(newBooking).subscribe((res:ResponseBooking)=>{
      if(res.error){
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
    this.user = this.userService.user
          

    //datos del negocio
    this.businessService.getBusinessById(+id_business).subscribe((res:ResponseBusiness)=>{
      if (res.error){
        alert(res.error)
      }else{    
        this.business=res.data[0]
        this.providerId=res.data[0].provider

        if(this.user.id_user === this.providerId){


          this.chatService.getAllUserChats(this.user.id_user).subscribe((res: ResponseChat)=>{
            if (res.error){
              alert(res.error)
            }else{
              this.chatList=res.data
              for (let chat of this.chatList){
                let otherUserId = chat.user1===this.user.id_user? chat.user2: chat.user1
                
                this.userService.getUserInfo(otherUserId).subscribe((res:ResponseUser)=>{
                  if (res.error){
                    alert(res.error)
                  }else{
                    let otherUser =res.data[0]
                    this.clientList.push(otherUser)
                  }
                })
        
              }
            }
          })
    
        }
     

        //datos del servicio
        this.serviceService.getOneService(+id_service).subscribe((res:ResponseService)=>{
          if (res.error){
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
            
          
            this.availableTimeframes.push({time0:this.inputTime0, time1: this.inputTime1, available: true})      
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
          }
        })
    }})

    
  
    // business: Business = this.businessService.business;
    
    // this.provider = this.businessService.provider;
  
  
    // service: Service = this.business.services[0];

    //datos de la agenda de usuario y proveedor + duración para calculos de tf
   
     

      this.bookingService.getUserBookings(this.userService.user.id_user).subscribe((res: ResponseBooking) => {

      for (let i = 0; i < res.data.length; i++) {
        let b = res.data[i]
        this.serviceService.getOneService(b.service).subscribe((res:ResponseService)=>{
          if(!res.error){
            b.duration=res.data[0].duration
          }
        })
        this.userAndProviderBookings.push(res.data[i]);
      }

    })

      this.bookingService.getUserBookings(this.business.provider).subscribe((res:ResponseBooking)=>{
        for (let i = 0; i<res.data.length; i++){
          let b = res.data[i]
          this.serviceService.getOneService(b.service).subscribe((res:ResponseService)=>{
            if(!res.error){
              b.duration=res.data[0].duration
            }
          })
          this.userAndProviderBookings.push(res.data[i]);
        }
      })

      


   
    this.headerNavbarService.showHeader = true;
    this.headerNavbarService.showNavbar = true;
    this.userService;

    

  }
}
