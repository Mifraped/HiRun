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
        public userId?: number
    ) {}

}

//he quitado la parte de preferencias porque va en tabla aparte, dejo rates para que no se rompa, pero cuando hagamos la tabla habrá que quitarlo
