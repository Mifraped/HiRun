import { Injectable } from '@angular/core';
import { Chat } from '../models/chat';
import { User } from '../models/user';
import { Message } from '../models/message';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  // private url = 'https://api-hi-run.vercel.app/chat';
  private url = 'http://localhost:3000';
  private currentChat: Chat;

  constructor(private http: HttpClient) {}

  // create some Message instances

  // Zuriñe: dejo comentado porque al cambiar el modelo chat para coincidir con la bbdd da errores
  //pongo las funciones en blanco para que no den errores los componentes que las llaman

  getChats(id_user: number): Observable<Chat[]> {
    return this.http.get<any[]>(`${this.url}/chat?id_user=${id_user}`).pipe(
      map((rows) => {
        const chats = {}; // Object to hold chats

        // Loop over rows returned by query
        for (let row of rows) {
          // If chat doesn't exist in chats object, create it
          if (!chats[row.id_chat]) {
            chats[row.id_chat] = new Chat(
              row.user1_id_user,
              row.user2_id_user,
              row.id_chat
            );
            chats[row.id_chat].participants = [
              new User(
                row.user1_email,
                row.user1_password,
                row.user1_name,
                row.user1_surname,
                row.user1_location,
                row.user1_phoneNumber,
                row.user1_photo,
                null, // Assuming you don't have rates data here
                row.user1_company,
                row.user1_id_user,
                row.user1_rate
              ),
              new User(
                row.user2_email,
                row.user2_password,
                row.user2_name,
                row.user2_surname,
                row.user2_location,
                row.user2_phoneNumber,
                row.user2_photo,
                null, // Assuming you don't have rates data here
                row.user2_company,
                row.user2_id_user,
                row.user2_rate
              ),
            ];
            chats[row.id_chat].messages = [];
          }

          // Add message to chat's messages array
          chats[row.id_chat].messages.push(
            new Message(row.text, row.timestamp, row.sender, row.id_message)
          );
        }

        // Convert chats object to array
        return Object.values(chats);
      })
    );
  }

  getChat(chatId: number): Observable<Chat> {
    return this.http.get<Chat>(`${this.url}/chat/${chatId}`);
  }



  getMessages(chatId: number): Observable<Message[]> {
    return this.http.get<Message[]>(`${this.url}/messages/${chatId}`);
  }

  createChat(userId: string, providerId: string): Observable<any> {
    return this.http.post<any>(`${this.url}/chat`, { userId, providerId });
  }

  sendMessage(chatId: number, sender: string, text: string): Observable<any> {
    return this.http.post<any>(`${this.url}/message`, { chatId, sender, text });
  }

  setCurrentChat(chat: any) {
    this.currentChat = chat;
  }

  getCurrentChat() {
    return this.currentChat;
  }



  // // create some Chat instances
  // chat1 = new Chat(
  //   1,
  //   [this.user1, this.user2],
  //   [this.message1, this.message2]
  // );
  // chat2 = new Chat(
  //   2,
  //   [this.user2, this.user1],
  //   [this.message1, this.message2]
  // );

  // private chats: Chat[] = [this.chat1, this.chat2];

  // setChats(chats: Chat[]) {
  //    this.chats = chats;
  // }

  // getChats(): Chat[] {
  //    return this.chats;
  // }

  public getAllUserChats(id_user: number): Observable<object> {
    return this.http.get(`${this.url}?id_user=${id_user}`);
  }
}
