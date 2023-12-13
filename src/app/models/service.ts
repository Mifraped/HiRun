import { User } from "./user"
import { Category } from "./category"
import { Job } from "./job"


export class Service {

    constructor (    
        public provider: User,
        public title: string,
        public jobs: Job [],
        // public timeframes: Timeframe[]; pendiente de definir clase
        public photo: string, //poner imagen por defecto
        public rating: number = -1,
        public tags?: Category [],
        public otherOptions?: string[],
        public serviceId?: number
    ) {}
}
