<<<<<<< HEAD
import { Component } from '@angular/core';
import { HeaderNavbarService } from './shared/header-navbar.service';
import { UserService } from './shared/user.service';

=======
// app.component.ts
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
>>>>>>> resultados

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
<<<<<<< HEAD
export class AppComponent {
  title = 'hirun';
  
  constructor(public headerNavbarService: HeaderNavbarService, userService:UserService){
    
      this.headerNavbarService.showHeader=false
      this.headerNavbarService.showNavbar=false
      
    
      
    }
  
}
=======
export class AppComponent implements OnInit {
  showHeader = true;

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.showHeader = !event.urlAfterRedirects.includes('filters');
      });
  }
}
>>>>>>> resultados
