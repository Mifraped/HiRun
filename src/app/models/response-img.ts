
export class ResponseImg {

    constructor(
        public error: boolean,
        public code: number,
        public message:string,
        public data:any){}
}
