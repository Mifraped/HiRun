import { Component } from '@angular/core';
import { Business } from 'src/app/models/business';
import { BusinessService } from 'src/app/shared/business.service';
import { HeaderNavbarService } from 'src/app/shared/header-navbar.service';
import { ResponseBusiness } from 'src/app/models/response-business';
import {Location} from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/shared/user.service';
import { ResponseUser } from 'src/app/models/response-user';

@Component({
  selector: 'app-business-provided',
  templateUrl: './service-provided.component.html',
  styleUrls: ['./service-provided.component.css'],
})
export class ServiceProvidedComponent {
  constructor(
    public businessService: BusinessService,
    public headerNavbarService: HeaderNavbarService,
    private _location:Location,
    private route:ActivatedRoute,
    public userService:UserService
  ) {
    this.headerNavbarService.showHeader = false;
    this.headerNavbarService.showNavbar = true;
  }

userBusinesses:Business[]

isMyBusiness:boolean=false
busUserName:string=''

  goBack(){
    this._location.back();
  }
  
  ngOnInit(): void {

    let id = this.route.snapshot.paramMap.get('id_user')

    this.businessService.getBusiness(+id).subscribe((resp: ResponseBusiness) => {
      this.userBusinesses = resp.data
    })

    if(this.userService.connected && +id===this.userService.user.id_user){
      this.isMyBusiness=true
      console.log(+id)
      console.log(this.userService.user.id_user)
    }else{
      this.userService.getUserInfo(+id).subscribe((res:ResponseUser)=>{
        if(!res.error){
          this.busUserName=`${res.data[0].name} ${res.data[0].surname}`
        }
      })
    }
    
  }
}
