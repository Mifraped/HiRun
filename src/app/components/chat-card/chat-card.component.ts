import { Component, OnInit, Input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ChatService } from 'src/app/shared/chat.service';
import { Chat } from 'src/app/models/chat';
import { UserService } from 'src/app/shared/user.service';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat-card',
  templateUrl: './chat-card.component.html',
  styleUrls: ['./chat-card.component.css'],
  providers: [DatePipe],
})
export class ChatCardComponent implements OnInit {
  @Input() chat: Chat;
  lastMessageTimestamp: string;
  otherUser: User;

  constructor(
    private datePipe: DatePipe,
    private chatService: ChatService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.otherUser = this.chat.participants.find(
      (participant) => participant.id_user !== this.userService.user.id_user
    );

    if (this.chat && this.chat.participants) {
      this.chat.participants.forEach((participant) => {});
    }

    if (this.chat && this.chat.messages) {
      let lastMessage = this.chat.messages[this.chat.messages.length - 1];
      this.lastMessageTimestamp = this.datePipe.transform(
        lastMessage.timestamp,
        'dd/MM'
      );

      // Get the logged-in user's ID
      let loggedInUserId = this.userService.user.id_user;

      // Filter the participants to get the other user's information
    }
  }

  onChatCardClick(chat: Chat) {
    this.chatService.setCurrentChat(chat);
    localStorage.setItem('currentChat', JSON.stringify(chat));
    this.router.navigate(['/chat-page']);
  }
}
