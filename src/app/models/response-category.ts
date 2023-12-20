import { Category } from "./category";

export class ResponseCategory {
    constructor(
        public error: boolean,
        public code: number,
        public message:string,
        public data: Category[]){}
}
