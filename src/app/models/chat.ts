import { User } from './user';

import { Message } from './message';

export class Chat {
  
  participants: User[];
  messages: Message[];

  constructor( 
    public user1: number, 
    public user2:number, 
    public id?: number) { }
}
