import { User } from './user';

export class Message {
  sender: User;
  timestamp: Date;
  content: string;

  constructor(sender: User, timestamp: Date, content: string) {
    this.sender = sender;
    this.timestamp = timestamp;
    this.content = content;
  }
}
