import { Component } from '@angular/core';
import { HeaderNavbarService } from 'src/app/shared/header-navbar.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
constructor(public headerNavbarService: HeaderNavbarService) { 
  this.headerNavbarService.showHeader=true
  this.headerNavbarService.showNavbar=true}
}
