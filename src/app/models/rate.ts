export class Rate {
    public name?:string;
    public photo?: string;

    constructor(public id_user:number, public id_service:number, public rate: number, public comment: string, public id_rate?:number){

    }
}
