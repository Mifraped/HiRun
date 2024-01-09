import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { HeaderNavbarService } from 'src/app/shared/header-navbar.service';
import { Router } from '@angular/router';
import { ResponseRates } from 'src/app/models/response-rates';
import { BusinessService } from 'src/app/shared/business.service';
import { ResponseBusiness } from 'src/app/models/response-business';
import { ResponseRequestedService } from 'src/app/models/response-requested-service';
import { User } from 'src/app/models/user';
import { RatingService } from 'src/app/shared/rating.service';
import { Rate } from 'src/app/models/rate';
import { GeolocationService } from 'src/app/shared/geolocation.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{

  avgRate:number
  rates:Rate[]
  city:string

  constructor(public userService: UserService, public headerNavbarService: HeaderNavbarService, private router: Router, public businesService: BusinessService,public ratingService:RatingService, public geolocationService:GeolocationService) { 
    this.headerNavbarService.showHeader=false
    this.headerNavbarService.showNavbar=true }
    

    public logOut(){
      this.userService.connected = false
      this.userService.user = new User(null, null, null, null, null, null, null)
      this.businesService.logedUserBusinesses = null
      this.userService.requestedServices = null
      this.router.navigate(["/home"])
    }

    public getBusiness(){
      return this.businesService.getBusiness().subscribe((resp: ResponseBusiness) => {
        this.businesService.logedUserBusinesses = resp.data
      })
    }

    public getRates(){
       this.ratingService.getRates().subscribe((resp:ResponseRates) => {
        this.userService.rates = resp.data
      }) 
    }

    public getServices(){
      this.userService.getUserRequestedServices().subscribe((res: ResponseRequestedService) => {
        this.userService.requestedServices = res.data
      })
    }

    ngOnInit(): void {
      this.ratingService.getAvgUserRates().subscribe((res:ResponseRates)=>{
        if (res.error){
          alert('error')
        }else{
          this.avgRate = res.data[0].rate
          
        }
      })

      this.ratingService.getRates().subscribe((res:ResponseRates) => {
        if (res.error){
          alert('error')
        }else{
          this.rates = res.data
          
        }
      }) 


      let coordObj = JSON.parse(this.userService.user.location)
      console.log(coordObj)

      this.city = this.geolocationService.cityList.find(m => m.latitude ===coordObj.latitude && m.longitude===coordObj.longitude).municipio
    }
}
