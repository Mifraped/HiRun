import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ChatService } from '../shared/chat.service';

@Injectable({
  providedIn: 'root',
})
export class ChatResolver implements Resolve<any> {
  constructor(private chatService: ChatService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    const chatId = localStorage.getItem('currentChat');
    if (chatId) {
      return this.chatService.getChat(chatId);
    }
  }
}
