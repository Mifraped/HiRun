import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { HeaderNavbarService } from 'src/app/shared/header-navbar.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  public home:boolean
  public profile:boolean

  constructor(public userService: UserService, public headerNavbarService: HeaderNavbarService, private router: Router){
    this.router.events.subscribe(() => {
      if(this.router.url == '/home'){
        this.home = true
        this.profile = false
      }
      else if(this.router.url == '/profile' || this.router.url == '/edit-profile' || this.router.url == '/ratings' || this.router.url == '/service-provided' || this.router.url == '/requested-service'){
        this.home = false
        this.profile = true
      }
      else{
        this.home = false
        this.profile = false
      }
    })
  }
  ngOnInit(): void {}

}
