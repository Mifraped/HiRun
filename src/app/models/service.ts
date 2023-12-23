export class Service {
    
    constructor (    
        
        public title: string,
        public price: number,
        public description: string,
        public duration: number,
        public id_business?: number, //quitar interrogación cuando no de fallos
        public id_service?: number
    ) {}
}
