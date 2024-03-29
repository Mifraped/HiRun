import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Business } from 'src/app/models/business';
import { UserService } from 'src/app/shared/user.service';
import { BusinessService } from 'src/app/shared/business.service';
import { Router } from '@angular/router';
import { HeaderNavbarService } from 'src/app/shared/header-navbar.service';
import { ActivatedRoute } from '@angular/router';
import { ResponseBusiness } from 'src/app/models/response-business';
import { Service } from 'src/app/models/service';
import { User } from 'src/app/models/user';
import { ServiceService } from 'src/app/shared/service.service';
import { ResponseService } from 'src/app/models/response-service';
import { ResponseUser } from 'src/app/models/response-user';
import { ImageService } from 'src/app/shared/image.service';
import { RatingService } from 'src/app/shared/rating.service';
import { ResponseRates } from 'src/app/models/response-rates';
import { ChatService } from 'src/app/shared/chat.service';
import {} from 'googlemaps';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { Location } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-business',
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.css'],
})
export class BusinessComponent implements AfterViewInit {
  business: Business;

  services: Service[];
  currentChat: any;
  loggedInUserId: number | null
  otherUser: User;
  provider: User;
  providerId: number;
  coordLoc: any;

  constructor(
    public userService: UserService,
    public businessService: BusinessService,
    private router: Router,
    public headerNavbarService: HeaderNavbarService,
    private route: ActivatedRoute,
    public serviceService: ServiceService,
    public imageService: ImageService,
    public ratingService: RatingService,
    public chatService: ChatService,
    private _location: Location
  ) {
    this.headerNavbarService.showHeader = true;
    this.headerNavbarService.showNavbar = true;
  }

  contactProvider() {
    if (this.userService.connected) {
      this.chatService.getAllUserChats(this.userService.user.id_user).subscribe((response: any) => {
        if (!response.data.find((chat) =>   (chat.user1 == this.providerId || chat.user1 == this.userService.user.id_user) && 
        (chat.user2 == this.userService.user.id_user || chat.user2 == this.providerId))) {
                this.chatService
        .createChat(
          this.userService.user.id_user.toString(),
          this.providerId.toString()
        )
        .pipe(
          switchMap((response: any) => {
             // Log the response
            // Extract the chatId from the response
            const chatId = response.chatId;
          // Log the chatId
            // Load the full chat data
            if (chatId) {
              
              // Return the getChat observable
              return this.chatService.getChat(chatId);
            }
            // If chatId is null, return an empty observable
            return of(null);
          })
        )
        .subscribe(
          (chat: any) => {
       
            if (chat) {
              this.chatService.setCurrentChat(chat);
             

             

              localStorage.setItem('currentChat', JSON.stringify(chat));
             
              this.router.navigate(['/chat-page']);
            } else {
             
            }
          },
          (error) => {
            console.error('Error in getChat:', error);
          }
        )
      }else{
        const chats = response.data;   
        const userProviderChat = chats.find((chat) =>   (chat.user1 == this.providerId || chat.user1 == this.userService.user.id_user) && 
        (chat.user2 == this.userService.user.id_user || chat.user2 == this.providerId))        
        this.chatService.getChat(userProviderChat.id_chat).subscribe((chat: any) => {
          if (chat) {
            this.chatService.getMessages(chat.id_chat).subscribe((messages: any) => {

              chat.messages = messages;
              this.chatService.setCurrentChat(chat);
              localStorage.setItem('currentChat', JSON.stringify(chat));
              this.router.navigate(['/chat-page']);
            })
          }
        }) 
      }
    })

    }else{
      Swal.fire({
        title: 'Inicia sesión para ponerte en contacto con el verdedor.',
        icon: 'info',
        text: 'Redirigiendo...',
        timerProgressBar: true,
        confirmButtonColor: 'var(--red)',
        confirmButtonText: 'Cancelar',
        timer: 2000,
      }).then((result) => {
        if (!result.isConfirmed) {
          this.router.navigate(['/login']);
        }
      });
    }
  }

  testNavigation() {
    this.router.navigate(['/chat-page']);

    Swal.fire({
      title: 'Inicia sesión para ponerte en contacto con el verdedor.',
      icon: 'info',
      text: 'Redirigiendo...',
      timerProgressBar: true,
      confirmButtonColor: 'var(--red)',
      confirmButtonText: 'Cancelar',
      timer: 2000,
    }).then((result) => {
      if (!result.isConfirmed) {
        this.router.navigate(['/login']);
      }
    });
  }

  goBack() {
    this._location.back();
  }

  imageUrl: string = '../../../assets/img/logo_servicios.png';
  businessRating: number;

  //mapa
  @ViewChild('gmapContainer', { static: false }) gmap: ElementRef;
  map: google.maps.Map;
  lat: number;
  lng: number;
  coordinates: google.maps.LatLng;

  // mapOptions: google.maps.MapOptions = {
  //  center: this.coordinates,
  //  zoom: 10
  // };

  marker: google.maps.Marker;
  mapInitializer() {
    this.map = new google.maps.Map(this.gmap.nativeElement, {
      center: this.coordinates,
      zoom: 15,
    });
    // this.marker.setMap(this.map);
    this.marker = new google.maps.Marker({
      position: this.coordinates,
      map: this.map,
    });
  }

  // marker = new google.maps.Marker({
  //   position: this.coordinates,
  //   map: this.map,
  // });

  ngAfterViewInit() {
    this.mapInitializer();
  }

  //

  ngOnInit() {
    this.loggedInUserId = this.userService.user?.id_user;

    this.currentChat = this.chatService.getCurrentChat();

    if (this.currentChat && this.currentChat.participants) {
      this.otherUser = this.currentChat.participants.find(
        (participant) => participant.id_user !== this.loggedInUserId
      );
    }

    const id = this.route.snapshot.paramMap.get('id_business');

    this.businessService
      .getBusinessById(+id)
      .subscribe((res: ResponseBusiness) => {
        if (res.error) {

          alert(res.error);
        } else {
          this.business = res.data[0];
          this.providerId = res.data[0].provider;

          if (res.data[0].photo && res.data[0].photo.length > 0) {
            this.imageUrl = res.data[0].photo;
          }

          this.ratingService
            .getAvgBusinessRates(+id)
            .subscribe((res: ResponseRates) => {
              if (!res.error) {
                this.businessRating = res.data[0].rate;
              }
            });

          this.userService
            .getUserInfo(this.providerId)
            .subscribe((res: ResponseUser) => {
              if (res.error) {
                alert(res.error);
              } else {
                this.provider = res.data[0];

                if (this.business.address && this.business.address.length > 0) {
                  this.coordLoc = JSON.parse(this.business.address);
                } else {
                  this.coordLoc = JSON.parse(this.provider.location);
                }

                this.lat = this.coordLoc ? this.coordLoc.latitude : 0;
                this.lng = this.coordLoc ? this.coordLoc.longitude : 0;

                // Actualizar las coordenadas después de inicializar lat y lng
                this.coordinates = new google.maps.LatLng(this.lat, this.lng);

                // Coloca aquí el código que depende de lat y lng, como la inicialización del mapa
                this.mapInitializer();
              }
            });

          this.serviceService
            .getAllServices(+id)
            .subscribe((res: ResponseService) => {
              if (res.error) {
                alert(res.error);
              } else {
                this.services = res.data;
              }
            });
        }
      });
  }
}
