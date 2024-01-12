import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/shared/chat.service';
import { Chat } from 'src/app/models/chat';
import { HeaderNavbarService } from 'src/app/shared/header-navbar.service';

import { UserService } from 'src/app/shared/user.service';

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {
  chats: Chat[] = [];

  constructor(
    private chatService: ChatService,
    private HeaderNavbarService: HeaderNavbarService,
    private userService: UserService,
    private route: ActivatedRoute
  ) {
    this.HeaderNavbarService.showHeader = true;
    this.HeaderNavbarService.showNavbar = true;
  }

  ngOnInit() {
    let chat = this.chatService.getCurrentChat();

    this.userService.getUserInfo(this.userService.user.id_user).subscribe(
      (response: any) => {
        const id_user = response.data[0].id_user;

        this.chatService.getChats(id_user).subscribe(
          (chats: Chat[]) => {
            this.chats = chats;
          },
          (error) => {
            console.error('Error fetching chats', error);
          }
        );
      },
      (error) => {
        console.error('Error fetching user info', error);
      }
    );
  }
}
