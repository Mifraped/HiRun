export class Job {
    
    constructor (    
        
        public title: string,
        public price: number,
        public description: string,
        public duration: number,
        public jobId?: number
    ) {}
}
