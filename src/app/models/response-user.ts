
import { User } from "./user";
export class ResponseUser {

    constructor(
        public error: boolean,
        public code: number,
        public msg:string,
        public data: User){}
}
