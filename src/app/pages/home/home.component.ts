import { Component } from '@angular/core';
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
import { Service} from 'src/app/models/service';

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
export class HomeComponent {
  negocio1: Business = this.BusinessService.business;

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
    public headerNavbarService: HeaderNavbarService
  ) {
    this.headerNavbarService.showHeader = true;
    this.headerNavbarService.showNavbar = true;
  }

  isPVisible = Array(this.faqItems.length).fill(false);

  togglePVisibility(index: number) {
    this.isPVisible[index] = !this.isPVisible[index];
  }
}
