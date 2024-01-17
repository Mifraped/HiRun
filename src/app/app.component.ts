import { HeaderNavbarService } from './shared/header-navbar.service';
import { UserService } from './shared/user.service';

// app.component.ts
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'hirun';
  showHeader = true;

  constructor(
    public headerNavbarService: HeaderNavbarService,
    public userService: UserService,
    private router: Router
  ) {
    this.headerNavbarService.showHeader = false;
    this.headerNavbarService.showNavbar = false;
  }

  ngOnInit() {
    this.userService.loadUser();
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.showHeader = !event.urlAfterRedirects.includes('filters');
      });
  }
}
