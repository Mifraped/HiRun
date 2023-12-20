import { Service } from "./service";

export class ResponseService {
    constructor(
        public error: boolean,
        public code: number,
        public message:string,
        public data: Service[]){}
}
