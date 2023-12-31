import { User } from './user';
import { Category } from './category';
import { Service } from './service';
import { TimeFrame } from './time-frame';

export class Business {
  public providerName?: string;
  public providerSurname?: string;
  public price?: number;
  public description?: string;
  public userPhoto?: string;
  public tags?: Category[];
  public distance?:number
  constructor(
    public provider: number,
    public title: string,
    public services: Service[],
    
    public photo: string, //poner imagen por defecto

    public rating: number = -1,
    public create_date?: string,
    public address?:string,    
    public id_business?: number
  ) {}
}
