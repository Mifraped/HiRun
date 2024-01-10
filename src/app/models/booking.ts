import { Time } from "@angular/common";
import { Business } from "./business";
import { Service} from "./service";
import { User } from "./user";

export class Booking {
    public provider?: User;
    public business?: Business;
    public id_booking?:number;
    
    constructor (    
        
        public date: Date,
        public time: string, //por ahora dejo como string porque no sé cómo haremos
        public service: number,
        public user:number,
        public canceled: number = 0,
        public comment?:string,
       
    ) {}
}
