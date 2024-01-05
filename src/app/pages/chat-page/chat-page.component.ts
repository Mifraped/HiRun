import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/shared/chat.service';
import { Chat } from 'src/app/models/chat';
import { HeaderNavbarService } from 'src/app/shared/header-navbar.service';

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.css'],
})
export class ChatPageComponent implements OnInit {
  chats: Chat[];

  constructor(
    private chatService: ChatService,
    private headernavbarbusiness: HeaderNavbarService
  ) {
    this.headernavbarbusiness.showHeader = true;
    this.headernavbarbusiness.showNavbar = false;
  }

  ngOnInit() {
    // this.chats = this.chatService.getChats();
  }
}
