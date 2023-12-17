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
<<<<<<< HEAD
export class AppComponent implements OnInit {
  Title = 'hirun';
  showHeader = true;

  constructor(
    private router: Router,
    public headerNavbarService: HeaderNavbarService,
    userService: UserService
=======
export class AppComponent {
  title = 'hirun';
  showHeader = true;

  constructor(
    public headerNavbarService: HeaderNavbarService,
    userService: UserService,
    private router: Router
>>>>>>> fix_merge
  ) {
    this.headerNavbarService.showHeader = false;
    this.headerNavbarService.showNavbar = false;
  }

  ngOnInit() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.showHeader = !event.urlAfterRedirects.includes('filters');
      });
  }
}
