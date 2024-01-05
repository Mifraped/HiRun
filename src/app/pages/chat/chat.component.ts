import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/shared/chat.service';
import { Chat } from 'src/app/models/chat';
import { HeaderNavbarService } from 'src/app/shared/header-navbar.service';
import { Head } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {
  chats: Chat[];

  constructor(
    private chatService: ChatService,
    private HeaderNavbarService: HeaderNavbarService
  ) {
    this.HeaderNavbarService.showHeader = true;
    this.HeaderNavbarService.showNavbar = true;
  }

  ngOnInit() {
    // this.chats = this.chatService.getChats();
  }
}
