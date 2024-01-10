import { Component, OnInit } from '@angular/core';
import { Rate } from 'src/app/models/rate';
import { ResponseRates } from 'src/app/models/response-rates';
import { HeaderNavbarService } from 'src/app/shared/header-navbar.service';
import { RatingService } from 'src/app/shared/rating.service';
import { UserService } from 'src/app/shared/user.service';
import {Location} from '@angular/common';
import { User } from 'src/app/models/user';
import { ActivatedRoute } from '@angular/router';
import { ResponseUser } from 'src/app/models/response-user';

@Component({
  selector: 'app-ratings',
  templateUrl: './ratings.component.html',
  styleUrls: ['./ratings.component.css']
})
export class RatingsComponent implements OnInit{

  public rating: number = 4
constructor(public headerNavbarService: HeaderNavbarService, public userService: UserService, public ratingService:RatingService, private _location:Location, private route:ActivatedRoute) { 
  this.headerNavbarService.showHeader=false
  this.headerNavbarService.showNavbar=true}

  userRates:Rate[]
  avgRate:number = 0
  rateUser:User
  rates:Rate[]

  goBack(){
    this._location.back();
  }

  async getData(id_user:number){
    this.userService.getUserInfo(id_user).subscribe((res: ResponseUser) => {
      if (!res.error) {
        this.rateUser = res.data[0];
      }
    })

    this.ratingService.getAvgUserRates(id_user).subscribe((res:ResponseRates)=>{
      if (res.error){
        alert('error')
      }else{
        this.avgRate = res.data[0].rate
        
      }
    })

    this.ratingService.getRates(id_user).subscribe((res:ResponseRates)=>{
      if (!res.error){
        
        this.rates = res.data
        
      }
    })
  }

  async ngOnInit(): Promise<void> {
    const id = this.route.snapshot.paramMap.get('id_user')
   await this.getData(+id)
  }
}
