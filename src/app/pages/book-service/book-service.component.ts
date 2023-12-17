import { Component, OnInit } from '@angular/core';

import { ServiceService } from 'src/app/shared/service.service';
import { UserService } from 'src/app/shared/user.service';
import { User } from 'src/app/models/user';
import { Service } from 'src/app/models/service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HeaderNavbarService } from 'src/app/shared/header-navbar.service';
import { Job } from 'src/app/models/job';
import { Location } from '@angular/common';

@Component({
  selector: 'app-book-service',
  templateUrl: './book-service.component.html',
  styleUrls: ['./book-service.component.css'],
})
export class BookServiceComponent implements OnInit {
  bookingForm: FormGroup;

  minDate: string;
  today = new Date();
  // user:User=this.userService.user
  user: User = this.serviceService.provider;
  selectedDate;
  provider: User = this.serviceService.provider;

  service: Service = this.serviceService.service;

  job: Job = this.service.jobs[0];

  clientList: User[] = [this.userService.user1];

  // creo un array de horas disponibles, falta toda la lógica de cómo vamos a ver qué franjas están disponibles
  timeFrames = [
    { time: '09:30', available: true },
    { time: '10:30', available: true },
    { time: '11:30', available: false },
    { time: '12:30', available: true },
    { time: '13:30', available: true },
    { time: '16:30', available: false },
    { time: '17:30', available: false },
  ];

  selectedClient: User | null = null; // Inicializa selectedClient con null
  constructor(
    private userService: UserService,
    private serviceService: ServiceService,
    private formBuilder: FormBuilder,
    public headerNavbarService: HeaderNavbarService,
    private location: Location
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
    const minPassLength = 8;

    this.bookingForm = this.formBuilder.group({
      date: [, [Validators.required]],
      time: [, [Validators.required]],
      user: [, this.addRequired()],
      comment: [, []],
    });
  }

  private addRequired() {
    let validators = [];
    console.log(this.user == this.provider);
    if (this.user == this.provider) {
      validators.push(Validators.required);
    }
    return validators;
  }

  bookService() {
    let newBooking = this.bookingForm.value;

    newBooking.service = this.service;
    newBooking.job = this.job;
    newBooking.provider = this.service.provider;

    console.log(newBooking);
  }

  ngOnInit() {
    this.clientList = [this.userService.user1];
    this.headerNavbarService.showHeader = true;
    this.headerNavbarService.showNavbar = true;
    this.userService;
  }
}
