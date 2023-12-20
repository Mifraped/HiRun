
import { User } from "./user";
export class ResponseUser {

    constructor(
        public error: boolean,
        public code: number,
        public message:string,
        public data: User){}
}
