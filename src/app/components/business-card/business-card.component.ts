import { Component, Input, OnInit } from '@angular/core';
import { Business } from 'src/app/models/business';
import { Service } from 'src/app/models/service';
import { BusinessService } from 'src/app/shared/business.service';

@Component({
  selector: 'app-business-card',
  templateUrl: './business-card.component.html',
  styleUrls: ['./business-card.component.css'],
})
export class BusinessCardComponent implements OnInit {
  @Input() business: Business;

  services: Service[];
  minPrice: number;

  servicetext: string;

  serviceToText(serviceArray) {}

  constructor(public businessService: BusinessService) {}

  ngOnInit() {
    this.services =
      this.business && this.business.services ? this.business.services : [];
    this.minPrice =
      this.services.length > 0
        ? this.services.reduce(
            (min, service) => (service.price < min ? service.price : min),
            this.services[0].price
          )
        : 0; // or some other default value
  }
}
