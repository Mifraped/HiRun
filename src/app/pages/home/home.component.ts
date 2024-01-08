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
    private geolocationService:GeolocationService
  ) {
    this.headerNavbarService.showHeader = true;
    this.headerNavbarService.showNavbar = true;
  }

  getGeoLocation(){
    this.geolocationService.getCurrentPosition().subscribe({
      next: (position) => {
        console.log('Latitude:', position.coords.latitude);
        console.log('Longitude:', position.coords.longitude);
        console.log(position.coords)
      },
      error: (error) => {
        console.error('Error getting geolocation:', error);
      },
    });
  }

  ngOnInit(): void {
    this.FiltersService.getNewestBusiness().subscribe((business) => {
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
        })
      );
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
        })
      );
    });
    this.getGeoLocation();
  }

  isPVisible = Array(this.faqItems.length).fill(false);

  togglePVisibility(index: number) {
    this.isPVisible[index] = !this.isPVisible[index];
  }


}
