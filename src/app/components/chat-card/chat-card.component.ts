import { Component, OnInit, Input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ChatService } from 'src/app/shared/chat.service';
import { Chat } from 'src/app/models/chat';

@Component({
  selector: 'app-chat-card',
  templateUrl: './chat-card.component.html',
  styleUrls: ['./chat-card.component.css'],
  providers: [DatePipe],
})
export class ChatCardComponent implements OnInit {
  @Input() chat: Chat;
  lastMessageTimestamp: string;

  constructor(private datePipe: DatePipe, private chatService: ChatService) {}

  ngOnInit() {
    if (this.chat && this.chat.messages) {
      let lastMessage = this.chat.messages[this.chat.messages.length - 1];
      this.lastMessageTimestamp = this.datePipe.transform(
        lastMessage.timestamp,
        'dd/MM'
      );
      // Log the chat data
      console.log(this.chat);

      // Log the participant data
      if (this.chat && this.chat.participants) {
        this.chat.participants.forEach((participant) => {
          console.log(participant);
        });
      }
    }
  }
}
