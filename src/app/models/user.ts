import { Category } from "./category";
import { Rate } from "./rate";

export class User {
    constructor (    
        public email: string,
        public password: string,
        public name: string,
        public surname: string,
        public location: string,
        public phoneNumber: number,
        public photo: string, //poner imagen por defecto
        public rates?: Rate[],
        public company?: string,
        public preferences?: Category [],
        public userId?: number
    ) {}

}
