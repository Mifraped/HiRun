import { User } from "./user"
import { Service } from "./service"
import { Category } from "./category"



export class Business {
    public services:Service[];
    public tags:Category[]
    // public otherOptions
    constructor (    
        public provider: User,
        public title: string,
        public photo: string, //poner imagen por defecto
        public rating: number = -1,
        public businessId?: number
    ) {}
}
