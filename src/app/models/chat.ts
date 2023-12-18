import { User } from './user';

import { Message } from './message';

export class Chat {
  id: string;
  participants: User[];
  messages: Message[];

  constructor(id: string, participants: User[], messages: Message[]) {
    this.id = id;
    this.participants = participants;
    this.messages = messages;
  }
}
