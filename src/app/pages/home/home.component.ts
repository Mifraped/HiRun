import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { UserService } from 'src/app/shared/user.service';

import { HeaderNavbarService } from 'src/app/shared/header-navbar.service';
import { BusinessService } from 'src/app/shared/business.service';
import { Business } from 'src/app/models/business';
import { Service } from 'src/app/models/service';
import { FiltersService } from 'src/app/shared/filters.service';
import { ActivatedRoute } from '@angular/router';
import { GeolocationService } from 'src/app/shared/geolocation.service';
import { CategoryService } from 'src/app/shared/category.service';
import { ResponseBusiness } from 'src/app/models/response-business';
import { RatingService } from 'src/app/shared/rating.service';
import { ResponseRates } from 'src/app/models/response-rates';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('slideDown', [
      state(
        'void',
        style({
          transform: 'translateY(-20px)',
          opacity: '0',
        })
      ),
      state(
        '*',
        style({
          transform: 'translateY(0)',
          opacity: '1',
        })
      ),
      transition('void <=> *', animate('500ms ease-in-out')),
    ]),
  ],
})
export class HomeComponent implements OnInit {
  @Input() business: any;
  @ViewChild('catWrapper') catWrapper: ElementRef;
  @ViewChild('newsCards') newsCards: ElementRef;
  @ViewChild('redCards') recCards: ElementRef;
  @ViewChild('bestCards') bestCards: ElementRef;

  LatestBusinesses: Business[] = [];
  BestRatedBusinesses: Business[] = [];
  negocio1: Business = this.BusinessService.business;
  RecommendedBusinesses: Business[] = [];

  scrollToPoint(): void {
    const element = this.el.nativeElement.querySelector('#faqSectionScroll');

    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  faqItems = [
    {
      question: `¿Cómo puedo buscar y reservar servicios en la plataforma?`,
      answer: `<p>Explora los servicios por cercanía o busca los mejor valorados en la página principal.</p><br>
      <p>También puedes utilizar el buscador y añadir los filtros necesarios hasta dar con el servicio que necesitas.</p><br>
      <p>Para pedir cita, deberás <a href ="/register"><strong>registrarte</strong><a> en HiRun y utilizar el gestor de reservas o ponerte en contacto con el vendedor`,
    },
    {
      question: `Quiero ofrecer mi propio servicio en HiRun, ¿qué tengo que hacer?`,
      answer: `<p>El primer paso es <a href ="/register"><strong>registrarte</strong><a>, si todavía no lo has hecho. Después, podrás generar tu negocio pulsando el botón (+) de la barra de navegación. </p><br>
      <p>Un negocio puede ofrecer uno o varios servicios. Además, podrás añadir la dirección o zona donde ofreces los servicios, una foto, tus horarios y más información de interés para potenciales clientes.`,
    },
    {
      question: `¿Cómo garantiza la plataforma la calidad de los servicios ofrecidos?`,
      answer: `<p>El equipo de <strong>HiRun</strong> monitoriza de forma contínua las valoraciones proporcionadas por los usuarios.</p><br>
      <p>Para evitar fraudes, estas valoraciones estan verificadas y no pueden enviarse sin haber completado antes el proceso de registro y reserva.</p><br>
      <p>Aun así, si tienes algún problema con la calidad de un servicio no dudes en ponerte en contacto con nosotros en:<br>
      <a class="contactMail" href="mailto:hirun.web@gmail.com"
      ><br />
      <b>hirun.web@gmail.com</b></a
    >
      `,
    },
    {
      question: `¿Cuáles son las políticas de pago y cancelación en la plataforma?`,
      answer: `<p>Desde <strong>HiRun</strong> no se gestionan los pagos del cliente al proveedor. </p><br>
      <p>Cada servicio tiene sus propias formas de pago (en efectivo, con tarjeta, bizum...) que se pueden consultar con el propio vendedor.</p><br>
      <p>La cancelación de una reserva está permitida hasta 24 horas antes de la cita, tanto para el cliente como para el proveedor del servicio. </p><br><p>Si ya ha pasado ese periodo y aun así necesitas cancelar la reserva, ponte en contacto directamente por chat con la parte implicada.`,
    },

    // Add more FAQ items here
  ];

  iconCat: any[];

  constructor(
    public UserService: UserService,
    public BusinessService: BusinessService,
    public headerNavbarService: HeaderNavbarService,
    private FiltersService: FiltersService,
    private route: ActivatedRoute,
    private geolocationService: GeolocationService,
    private categoryService: CategoryService,
    private el: ElementRef,
    private ratingService: RatingService
  ) {
    this.headerNavbarService.showHeader = true;
    this.headerNavbarService.showNavbar = true;
  }

  //geolocalización
  lat: number = 0;
  lng: number = 0;

  async getGeoLocation() {
    this.geolocationService.getCurrentPosition().subscribe({
      next: (position) => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.UserService.currentLocation = {
          latitude: this.lat,
          longitude: this.lng,
        };
      },
      error: (error) => {
        console.error('Error getting geolocation:', error);
        if (this.UserService.connected) {
          const coord = JSON.parse(this.UserService.user.location);
          this.UserService.currentLocation = {
            latitude: coord.latitude,
            longitude: coord.longitude,
          };
        } else {
          this.UserService.currentLocation = { latitude: 0, longitude: 0 };
        }
      },
    });
  }

  //calcular distancia y ordenar
  getDistance(busArray: Business[]): Business[] {
    for (let b of busArray) {
      const coord = JSON.parse(b.address);
      const distance = this.geolocationService.calcDistance(
        coord,
        this.UserService.currentLocation
      );
      b.distance = distance;
    }
    busArray.sort((a, b) => a.distance - b.distance);
    return busArray;
  }

  //fin geolocalización
  ngOnInit(): void {
    this.getGeoLocation();

    this.iconCat = this.categoryService.iconCat;

    this.route.queryParams.subscribe((params) => {
      const category = params['categories'];
    });
    this.BusinessService.getAllbusiness().subscribe((res: ResponseBusiness) => {
      if (!res.error) {
        this.LatestBusinesses = res.data;
        if (this.LatestBusinesses) {
          if (this.UserService.currentLocation) {
            this.LatestBusinesses = this.getDistance(
              this.LatestBusinesses
            ).slice(0, 10);
          } else {
            this.LatestBusinesses = this.LatestBusinesses.slice(0, 10);
          }
        }
        const allBusiness=res.data
       
        const ratingPromises = allBusiness.map((b) => {
          return new Promise<void>((resolve) => {
            this.ratingService.getAvgBusinessRates(b.id_business).subscribe((res: ResponseRates) => {
              if (!res.error) {
                b.rating = res.data[0].rate;
              }
              resolve(); // Resuelve la promesa después de procesar la calificación
            });
          });
        });
        
        // Esperar a que todas las promesas se resuelvan
        Promise.all(ratingPromises).then(() => {
          // Después de que todas las promesas se hayan resuelto, filtra y asigna a BestRatedBusinesses
          this.BestRatedBusinesses = (allBusiness.filter((b) => b.rating >= 3.5)).sort((a, b) => b.rating - a.rating);
    
        });
      }
    });

    if (this.UserService.connected) {
      this.BusinessService.getRecommendedBusiness(
        this.UserService.user.id_user
      ).subscribe((resp: ResponseBusiness) => {
        this.UserService.recommendedBusinesses = this.getDistance(resp.data);
      });
    }
  }

  isPVisible = Array(this.faqItems.length).fill(false);

  togglePVisibility(index: number) {
    this.isPVisible[index] = !this.isPVisible[index];
  }

  nextCat():void{
const currentPosition = this.catWrapper.nativeElement.scrollLeft;
const newPosition = currentPosition + 100; 

this.catWrapper.nativeElement.scrollTo({
  left: newPosition,
  behavior: 'smooth' 
});

  }

  prevCat():void{    
    const currentPosition = this.catWrapper.nativeElement.scrollLeft;
    const newPosition = currentPosition - 100;
    this.catWrapper.nativeElement.scrollTo({
      left: newPosition,
      behavior: 'smooth' 
    });
  }

  nextNews() {
    this.newsCards.nativeElement.scrollBy({
      left: 300, 
      behavior: 'smooth'
    });
    
  }

  prevNews() {
    this.newsCards.nativeElement.scrollBy({
      left: -300, 
      behavior: 'smooth'
    });
    
  }

 


  
  prevRecs() {
    const recCardsElement = this.el.nativeElement.querySelector('.recommended-cards');
    if (recCardsElement) {
      recCardsElement.scrollLeft -= 300; 
     
    }
  }

  nextRecs() {
    const recCardsElement = this.el.nativeElement.querySelector('.recommended-cards');
    if (recCardsElement) {
      recCardsElement.scrollLeft += 300; 
    
    }
  }
  
  
  prevBest() {
    const recCardsElement = this.el.nativeElement.querySelector('.negocio_container');
    if (recCardsElement) {
      recCardsElement.scrollLeft -= 300; 
      
    }
  }

  nextBest() {
    const recCardsElement = this.el.nativeElement.querySelector('.negocio_container');
    if (recCardsElement) {
      recCardsElement.scrollLeft += 300; 
      
    }
  }



}
