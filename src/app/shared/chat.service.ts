import { Injectable } from '@angular/core';
import { Chat } from '../models/chat';
import { User } from '../models/user';
import { Message } from '../models/message';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  // private url = 'https://api-hi-run.vercel.app/chat';
  private url = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  user1 = new User(
    'juan@example.com',
    '1234',
    'David',
    'Perez',
    'Spain',
    12314,
    'https://media.istockphoto.com/id/1484631693/es/foto/retrato-de-un-joven-cauc%C3%A1sico-adolescente-de-18-o-19-a%C3%B1os-al-aire-libre.jpg?s=612x612&w=0&k=20&c=AH7f1geIm-toSuCSrU60UJdFh4L0VZf2zhUC5xPbb1o='
  );

  user2 = new User(
    'juan@example.com',
    '1234',
    'Juan',
    'Perez',
    'Spain',
    12314,
    'https://media.istockphoto.com/id/1484631693/es/foto/retrato-de-un-joven-cauc%C3%A1sico-adolescente-de-18-o-19-a%C3%B1os-al-aire-libre.jpg?s=612x612&w=0&k=20&c=AH7f1geIm-toSuCSrU60UJdFh4L0VZf2zhUC5xPbb1o='
  );

  // create some Message instances

  message1 = new Message(
    this.user1,
    new Date(),
    'Hello how are you, I am interested in buying that ps4 you have on sale. Is it still available?'
  );
  message2 = new Message(this.user2, new Date(), 'Bye');

  // Zuriñe: dejo comentado porque al cambiar el modelo chat para coincidir con la bbdd da errores
  //pongo las funciones en blanco para que no den errores los componentes que las llaman

  getChats(id_user: number): Observable<Chat[]> {
    return this.http.get<Chat[]>(`${this.url}/chat?id_user=${id_user}`);
  }

  createChat(userId: string, providerId: string): Observable<Chat> {
    // Replace with your actual API endpoint to create a chat
    return this.http.post<Chat>(`${this.url}/chat`, { userId, providerId });
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
