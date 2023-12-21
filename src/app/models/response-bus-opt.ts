import { BusinessOpt } from "./business-opt";
export class ResponseBusOpt {
    constructor(
        public error: boolean,
        public code: number,
        public message:string,
        public data: BusinessOpt[]){}
}
