import { Booking } from "./booking";

export class ResponseBooking {
    constructor(
        public error: boolean,
        public code: number,
        public message:string,
        public data: Booking[]){}
}
