import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/shared/chat.service';
import { Chat } from 'src/app/models/chat';
import { HeaderNavbarService } from 'src/app/shared/header-navbar.service';
import { UserService } from 'src/app/shared/user.service';
import { ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.css'],
})
export class ChatPageComponent implements OnInit {
  chats: Chat[] = [];
  messages: any[] = [];
  chatId: number;
  user1_id: number;
  user2_id: number;
  loggedInUserId: any;
  otherUser: any;
  currentChat: any;
  messageInputField: any;

  constructor(
    private chatService: ChatService,
    private headernavbarbusiness: HeaderNavbarService,
    private userService: UserService,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.headernavbarbusiness.showHeader = true;
    this.headernavbarbusiness.showNavbar = false;
    this.route.data.subscribe((data: { chat: any }) => {
      this.currentChat = data.chat;
    });
  }

  ngOnInit() {
    this.chatService.getCurrentChat().subscribe((chat) => {
      if (chat) {
        this.currentChat = chat;
      } else {
        this.currentChat = JSON.parse(localStorage.getItem('currentChat'));

        // If currentChat was retrieved from localStorage, set it again
        if (this.currentChat) {
          this.chatService.setCurrentChat(this.currentChat);
        }
      }

      if (this.currentChat && !this.currentChat.id_chat) {
        this.currentChat.id_chat = this.currentChat.id;
      }

      this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.updateChatData();
        }
      });

      this.loggedInUserId = this.userService.user.id_user;

      if (this.currentChat) {
        this.updateChatData();
      }
    });
  }

  sendMessage(text: string, messageInput: HTMLInputElement) {
    this.chatService
      .sendMessage(this.currentChat.id_chat, this.loggedInUserId, text)
      .subscribe((response) => {
        // Add a delay before fetching the updated list of messages
        setTimeout(() => {
          this.chatService
            .getMessages(this.currentChat.id_chat)
            .subscribe((messages) => {
              this.currentChat.messages = messages;

              // Clear the input field
              messageInput.value = '';
              this.cdr.detectChanges(); // Trigger change detection to update the view
            });
        }, 300); // Delay of 1 second
      });
  }

  updateChatData() {
    this.chatService.getCurrentChat().subscribe((chat) => {
      this.currentChat = chat;

      if (this.currentChat) {
        if (this.currentChat.participants) {
          this.otherUser = this.currentChat.participants.find(
            (participant) => participant.id_user !== this.loggedInUserId
          );
        } else {
          this.otherUser =
            this.currentChat.user1_id_user === this.loggedInUserId
              ? {
                  id_user: this.currentChat.user2_id_user,
                  name: this.currentChat.user2_name,
                  surname: this.currentChat.user2_surname,
                  photo: this.currentChat.user2_photo,
                }
              : {
                  id_user: this.currentChat.user1_id_user,
                  name: this.currentChat.user1_name,
                  surname: this.currentChat.user1_surname,
                  photo: this.currentChat.user1_photo,
                };
        }
      } else {
        console.log('currentChat is falsy');
      }
    });
  }
}
