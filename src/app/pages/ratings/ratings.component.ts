import { Component, OnInit } from '@angular/core';
import { Rate } from 'src/app/models/rate';
import { ResponseRates } from 'src/app/models/response-rates';
import { HeaderNavbarService } from 'src/app/shared/header-navbar.service';
import { RatingService } from 'src/app/shared/rating.service';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-ratings',
  templateUrl: './ratings.component.html',
  styleUrls: ['./ratings.component.css']
})
export class RatingsComponent implements OnInit{

  public rating: number = 4
constructor(public headerNavbarService: HeaderNavbarService, public userService: UserService, public ratingService:RatingService) { 
  this.headerNavbarService.showHeader=false
  this.headerNavbarService.showNavbar=true}

  userRates:Rate[]
  avgRate:number = 0

  ngOnInit(): void {
    this.ratingService.getAvgUserRates().subscribe((res:ResponseRates)=>{
      if (res.error){
        alert('error')
      }else{
        this.avgRate = res.data[0].rate
        
      }
    })
  }
}
