import { User } from './user';

export class Message {
  constructor(
    public text: string,
    public timestamp: Date,
    public sender: number,
    public id_message?: number
  ) {}
}
