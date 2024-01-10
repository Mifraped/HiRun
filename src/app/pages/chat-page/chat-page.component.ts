import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/shared/chat.service';
import { Chat } from 'src/app/models/chat';
import { HeaderNavbarService } from 'src/app/shared/header-navbar.service';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.css'],
})
export class ChatPageComponent implements OnInit {
  chats: Chat[] = [];

  constructor(
    private chatService: ChatService,
    private headernavbarbusiness: HeaderNavbarService,
    private userService: UserService
  ) {
    this.headernavbarbusiness.showHeader = true;
    this.headernavbarbusiness.showNavbar = false;
  }

  ngOnInit() {
    this.chatService
      .getChats(this.userService.user.id_user)
      .subscribe((chats) => {
        console.log(chats); // log the chats data
        this.chats = chats;
      });
  }
}
