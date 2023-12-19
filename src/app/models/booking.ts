import { Time } from "@angular/common";
import { Business } from "./business";
import { Business} from "./business";
import { User } from "./user";

export class Booking {
    
    constructor (    
        
        public date: Date,
        public time: string, //por ahora dejo como string porque no sé cómo haremos
        public business: Business,
        public service: Service,
        public provider: User,
        public user:User,
        public comment?:string
    ) {}
}
