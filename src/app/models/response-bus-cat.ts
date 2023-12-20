import { BusinessCat } from "./business-cat";

export class ResponseBusCat {
    constructor(
        public error: boolean,
        public code: number,
        public message:string,
        public data: BusinessCat[]){}
}
