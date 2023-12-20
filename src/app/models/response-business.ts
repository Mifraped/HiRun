import { Business } from "./business";

export class ResponseBusiness {

    constructor(
        public error: boolean,
        public code: number,
        public message:string,
        public data:any){}
}


