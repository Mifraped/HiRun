import { Component } from '@angular/core';
import { HeaderNavbarService } from './shared/header-navbar.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'hirun';
  constructor(public headerNavbarService: HeaderNavbarService){
    
      this.headerNavbarService.showHeader=false
      this.headerNavbarService.showNavbar=false
  
      
    }
  
}