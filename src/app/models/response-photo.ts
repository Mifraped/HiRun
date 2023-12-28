export class ResponsePhoto {

    constructor(
        public error: boolean,
        public code: number,
        public message: string,
        public data: string
    ) { }
}
