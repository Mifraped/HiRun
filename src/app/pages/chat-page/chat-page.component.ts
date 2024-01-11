import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/shared/chat.service';
import { Chat } from 'src/app/models/chat';
import { HeaderNavbarService } from 'src/app/shared/header-navbar.service';
import { UserService } from 'src/app/shared/user.service';
import { ChangeDetectorRef } from '@angular/core';

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
    private cdr: ChangeDetectorRef
  ) {
    this.headernavbarbusiness.showHeader = true;
    this.headernavbarbusiness.showNavbar = false;
  }

  ngOnInit() {

    this.currentChat = this.chatService.getCurrentChat();
    this.loggedInUserId = this.userService.user.id_user;
    console.log('Logged-in user ID:', this.loggedInUserId);

    if (!this.currentChat) {
      const storedChat = localStorage.getItem('currentChat');
      if (storedChat) {
        this.currentChat = JSON.parse(storedChat);
        this.chatService.setCurrentChat(this.currentChat);
      }
    }

    if (this.currentChat) {
      this.otherUser = this.currentChat.participants.find(participant => participant.id_user !== this.loggedInUserId);
      this.cdr.detectChanges();
      console.log('Other user:', this.otherUser);
      console.log('Current chat:', this.currentChat); // log the current chat object
      this.chatId = this.currentChat.id;
      this.messages = this.currentChat.messages;
      this.user1_id = this.currentChat.user1;
      console.log('User 1 ID:', this.user1_id); // log the user1_id property
    }
  }

  sendMessage(text: string, messageInput: HTMLInputElement) {
    this.chatService.sendMessage(this.currentChat.id, this.loggedInUserId, text)
      .subscribe(response => {
        console.log(response);
        // Fetch the updated list of messages
        this.chatService.getMessages(this.currentChat.id)
          .subscribe(messages => {
            this.currentChat.messages = messages;
            console.log('Updated messages:', this.currentChat.messages);
            // Clear the input field
            messageInput.value = '';
            this.cdr.detectChanges();
          });
      });
  }
}
