import { RequestedService } from "./requested-service";

export class ResponseRequestedService {
    constructor(public error: boolean, public code: number, public message: string, public data: RequestedService[]){}
}
