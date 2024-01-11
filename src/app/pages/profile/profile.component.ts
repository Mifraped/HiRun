import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { HeaderNavbarService } from 'src/app/shared/header-navbar.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ResponseRates } from 'src/app/models/response-rates';
import { BusinessService } from 'src/app/shared/business.service';
import { ResponseBusiness } from 'src/app/models/response-business';
import { ResponseRequestedService } from 'src/app/models/response-requested-service';
import { User } from 'src/app/models/user';
import { RatingService } from 'src/app/shared/rating.service';
import { Rate } from 'src/app/models/rate';
import { GeolocationService } from 'src/app/shared/geolocation.service';
import {Location} from '@angular/common';
import { ResponseUser } from 'src/app/models/response-user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{

  avgRate:number
  rates:Rate[]
  city:string
  
  profileUser:User

  isMyProfile:Boolean = false

  constructor(public userService: UserService, public headerNavbarService: HeaderNavbarService, private router: Router, public businesService: BusinessService,public ratingService:RatingService, public geolocationService:GeolocationService, private _location:Location, public route: ActivatedRoute) { 
    this.headerNavbarService.showHeader=false
    this.headerNavbarService.showNavbar=true }
    
    goBack(){
      this._location.back();
    }
    
    round(number:number){
      let decimal = number - Math.floor(number)
      if (decimal >= 0.5) return Math.ceil(number)
      else return Math.floor(number)
    }
    public logOut(){
      this.userService.connected = false
      this.userService.user = new User(null, null, null, null, null, null, null)
      this.businesService.logedUserBusinesses = null
      this.userService.requestedServices = null
      this.userService.recommendedBusinesses = null
      this.router.navigate(["/home"])
    }

    public getRates(){
       this.ratingService.getRates(this.profileUser.id_user).subscribe((resp:ResponseRates) => {
        this.userService.rates = resp.data
      }) 
    }


    public getServices(){
      this.userService.getUserRequestedServices().subscribe((res: ResponseRequestedService) => {
        this.userService.requestedServices = res.data
      })
    }

          

      
    
    

    async getData(){
      this.ratingService.getAvgUserRates(this.profileUser.id_user).subscribe((res:ResponseRates)=>{

        if (res.error){
          alert('error')
        }else{
          this.avgRate = res.data[0].rate
        }
      })


      this.ratingService.getRates(this.profileUser.id_user).subscribe((res:ResponseRates) => {
        if (res.error){
          alert('error')
        }else{
        }
      }) 

      let coordObj = JSON.parse(this.profileUser.location)


      this.city = this.geolocationService.cityList.find(m => m.latitude ===coordObj.latitude && m.longitude===coordObj.longitude).municipio
    }

    async ngOnInit(): Promise<void> {
      let id = this.route.snapshot.paramMap.get('id_user')
      
      if (+id===0){
        this.profileUser=this.userService.user
        this.isMyProfile=true
        this.getData()
      
      }else if(this.userService.connected && +id ===this.userService.user?.id_user){
        this.profileUser=this.userService.user
        this.isMyProfile=true
        this.getData()
      }else{
        this.userService.getUserInfo(+id).subscribe((res: ResponseUser) => {
          if (!res.error) {
            this.profileUser = res.data[0];
            this.getData()
          }
        })
      } 
      
      

      
}}

