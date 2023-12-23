import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  thisId:number

  serviceToText(serviceArray) {}

  constructor(public businessService: BusinessService, private router:Router) {

  }

  goToBusiness() {
       this.router.navigate(['/business', this.business.id_business]);
  }

  ngOnInit() {
    this.services =
      this.business && this.business.services ? this.business.services : [];
    this.minPrice =
      this.services.length > 0
        ? this.services.reduce(
            (min, service) => (service.price < min ? service.price : min),
            this.services[0].price
          )
        : 0; 

    this.thisId=this.business.id_business
    
  }
}
