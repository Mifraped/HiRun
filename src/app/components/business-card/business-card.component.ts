import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Business } from 'src/app/models/business';
import { Service } from 'src/app/models/service';
import { BusinessService } from 'src/app/shared/business.service';
import { ImageService } from 'src/app/shared/image.service';
import { BusinessOpt } from 'src/app/models/business-opt';
import { ResponseBusOpt } from 'src/app/models/response-bus-opt';
import { OptionService } from 'src/app/shared/option.service';

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
  initialOptions:BusinessOpt[] = []
  
  thisId:number

  serviceToText(serviceArray) {}

  constructor(public businessService: BusinessService, private router:Router, public imageService:ImageService, public optionsService: OptionService) {

  }

  opt1 ={selected:false, icon:'fa-solid fa-house', i:1}
  opt2 ={selected:false, icon:'fa-solid fa-laptop', i:2}
  opt3 ={selected:false, icon:'fa-regular fa-credit-card', i:3}
  opt4 ={selected:false, icon:'fa-solid fa-coins', i:4}

  allOptions = [this.opt1, this.opt2, this.opt3, this.opt4];
  selectedOptions:number[] = []


  goToBusiness() {
       this.router.navigate(['/business', this.business.id_business]);
  }

  imageUrl:string

  getImageUrl(imageName: string): string {
    return `${this.imageService.serverUrl}${imageName}`;
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
    this.imageUrl=this.business.photo

    //opciones extra para los iconos
    this.optionsService.getBusinessOpt(this.thisId).subscribe((res:ResponseBusOpt)=>{
      if (res.error){
        console.log('error')
        alert(res.error)
      }else{    
        for  (let i=0; i<res.data.length;i++){         
          this.initialOptions.push(res.data[i])
          this.selectedOptions.push(res.data[i].id_options-1)
          
        }
        console.log(this.initialOptions)
        console.log(this.selectedOptions)
      }
    })



    
  }
}
