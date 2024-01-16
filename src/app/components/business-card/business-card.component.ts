import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Business } from 'src/app/models/business';
import { Service } from 'src/app/models/service';
import { BusinessService } from 'src/app/shared/business.service';
import { ImageService } from 'src/app/shared/image.service';
import { BusinessOpt } from 'src/app/models/business-opt';
import { ResponseBusOpt } from 'src/app/models/response-bus-opt';
import { OptionService } from 'src/app/shared/option.service';
import { RatingService } from 'src/app/shared/rating.service';
import { ResponseRates } from 'src/app/models/response-rates';

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
  initialOptions: BusinessOpt[] = [];

  thisId: number;
  businessRating: number;

  imageUrl: string = '../../../assets/img/logo_business_home.png';

  calcSize():number{
    let num = this.business.price
    let fontSize: number

    switch (true){
      case num>9999:
        fontSize=17
        break;
      case num>99:
        fontSize=20
        break;
      default:
        fontSize=22
      }
      return fontSize
  }

  serviceToText(serviceArray) {}

  constructor(
    public businessService: BusinessService,
    private router: Router,
    public optionsService: OptionService,
    public ratingService: RatingService
  ) {}

  opt1 = { selected: false, icon: 'fa-solid fa-house', i: 1 };
  opt2 = { selected: false, icon: 'fa-solid fa-laptop', i: 2 };
  opt3 = { selected: false, icon: 'fa-regular fa-credit-card', i: 3 };
  opt4 = { selected: false, icon: 'fa-solid fa-coins', i: 4 };

  allOptions = [this.opt1, this.opt2, this.opt3, this.opt4];
  selectedOptions: number[] = [];

  goToBusiness() {
    this.router.navigate(['/business', this.business.id_business]);
  }

  seeProfile(){
    this.router.navigate(['/profile', this.business.provider]);
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

    this.thisId = this.business.id_business;

    if (this.business.photo && this.business.photo.length > 0) {
      this.imageUrl = this.business.photo;
    }

    //opciones extra para los iconos
    this.optionsService
      .getBusinessOpt(this.thisId)
      .subscribe((res: ResponseBusOpt) => {
        if (!res.error) {
         
         
          for (let i = 0; i < res.data.length; i++) {
            this.initialOptions.push(res.data[i]);
            this.selectedOptions.push(res.data[i].id_options - 1);
          }
        
        }
      });

    //rating
    this.ratingService
      .getAvgBusinessRates(this.thisId)
      .subscribe((res: ResponseRates) => {
        if (!res.error) {
          
          this.businessRating = res.data[0].rate;
        
        }
      });
  }
}
