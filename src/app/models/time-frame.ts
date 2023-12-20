import { Time } from "@angular/common";

export class TimeFrame {
    constructor (    
        public start: Time,
        public end: Time,
        public days: string,
        public id_business: number,
      
    ) {}
}
