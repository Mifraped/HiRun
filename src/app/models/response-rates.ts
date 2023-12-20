import { Rate } from "./rate";

export class ResponseRates {
    constructor(public error: boolean, public code: number, public message: string, public data: Rate[]){}
}
