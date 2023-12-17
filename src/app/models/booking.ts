import { Time } from "@angular/common";
import { Service } from "./service";
import { Job } from "./job";
import { User } from "./user";

export class Booking {
    
    constructor (    
        
        public date: Date,
        public time: string, //por ahora dejo como string porque no sé cómo haremos
        public service: Service,
        public job: Job,
        public provider: User,
        public user:User,
        public comment?:string
    ) {}
}
