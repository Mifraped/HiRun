import { Component } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { HeaderNavbarService } from 'src/app/shared/header-navbar.service';
import { Router } from '@angular/router';
import { ResponseRates } from 'src/app/models/response-rates';
import { BusinessService } from 'src/app/shared/business.service';
import { ResponseBusiness } from 'src/app/models/response-business';
import { ResponseRequestedService } from 'src/app/models/response-requested-service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  constructor(public userService: UserService, public headerNavbarService: HeaderNavbarService, private router: Router, public businesService: BusinessService) { 
    this.headerNavbarService.showHeader=false
    this.headerNavbarService.showNavbar=true }
    

    public logOut(){
      this.userService.connected = false
      this.router.navigate(["/home"])
    }

    public getBusiness(){
      return this.businesService.getBusiness().subscribe((resp: ResponseBusiness) => {
        this.businesService.logedUserBusinesses = resp.data
        console.log(this.businesService.logedUserBusinesses);
        
      })
    }

    public getRates(){
      this.userService.getRates().subscribe((resp:ResponseRates) => {
        this.userService.rates = resp.data
      }) 
    }

    public getServices(){
      this.userService.getUserRequestedServices().subscribe((res: ResponseRequestedService) => {
        this.userService.requestedServices = res.data
        console.log(res.data)
        console.log(this.userService.requestedServices);
        
        
      })
    }
}
