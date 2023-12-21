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
  constructor(
    public provider: User,
    public title: string,
    public services: Service[],
    // public timeFrames: Timeframe[]; //pendiente de definir clase
    public photo: string, //poner imagen por defecto

    public rating: number = -1,
    public tags?: Category[],
    // public otherOptions?: string[], //pendiente de definir las opciones
    public businessId?: number
  ) {}
}
