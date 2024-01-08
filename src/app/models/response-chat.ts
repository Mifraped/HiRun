import { Chat } from "./chat";

export class ResponseChat {
    constructor(
        public error: boolean,
        public code: number,
        public message:string,
        public data: Chat[]){}
    
}
