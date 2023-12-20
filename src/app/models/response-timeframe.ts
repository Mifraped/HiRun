import { TimeFrame } from "./time-frame";

export class ResponseTimeframe {
    constructor(
        public error: boolean,
        public code: number,
        public message:string,
        public data: TimeFrame[]){}
}
