import { Component, OnInit, Input } from '@angular/core';
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
  LatestBusinesses: Business[] = [];
  BestRatedBusinesses: Business[] = [];
  negocio1: Business = this.BusinessService.business;
  RecommendedBusinesses: Business[] = [];

  faqItems = [
    {
      question: 'First question',
      answer: 'Answer to the first question',
    },
    {
      question: 'Second question',
      answer: 'Answer to the second question',
    },
    {
      question: 'Third question',
      answer: 'Answer to the third question',
    },
    {
      question: 'Fourth question',
      answer: 'Answer to the fourth question',
    },

    // Add more FAQ items here
  ];

  constructor(
    public UserService: UserService,
    public BusinessService: BusinessService,
    public headerNavbarService: HeaderNavbarService,
    private FiltersService: FiltersService,
    private route: ActivatedRoute,
    private geolocationService: GeolocationService
  ) {
    this.headerNavbarService.showHeader = true;
    this.headerNavbarService.showNavbar = true;
  }

  //geolocalización
  lat: number;
  lng: number;

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
        this.UserService.currentLocation = { latitude: 0, longitude: 0 };
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
   
    this.route.queryParams.subscribe((params) => {
      const category = params['categories'];
      // console.log('Categoria en home: ' + category);
    });
    this.FiltersService.getNewestBusiness().subscribe(async (business) => {
      this.LatestBusinesses = business.map(
        ({
          provider,
          title,
          photo,
          rating,
          location,
          phoneNumber,
          providerName,
          providerSurname,
          price,
          description,
          userPhoto,
          id_business,
          address,
        }) => ({
          provider,
          title,
          photo,
          rating,
          location,
          phoneNumber,
          providerName,
          providerSurname,
          price,
          description,
          userPhoto,
          id_business,
          address,
        })
      );

      if (this.UserService.currentLocation){

        this.LatestBusinesses = this.getDistance(this.LatestBusinesses).slice(0, 10)
        console.log(this.LatestBusinesses)
      }
    });

    this.FiltersService.getPopularBusiness().subscribe((business) => {
      this.BestRatedBusinesses = business.map(
        ({
          provider,
          title,
          photo,
          rating,
          location,
          phoneNumber,
          providerName,
          providerSurname,
          price,
          description,
          userPhoto,
          id_business,
          address,
        }) => ({
          provider,
          title,
          photo,
          rating,
          location,
          phoneNumber,
          providerName,
          providerSurname,
          price,
          description,
          userPhoto,
          id_business,
          address,
        })
      );
    });
  }

  isPVisible = Array(this.faqItems.length).fill(false);

  togglePVisibility(index: number) {
    this.isPVisible[index] = !this.isPVisible[index];
  }
}
