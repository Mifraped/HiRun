import { Injectable } from '@angular/core';
import { Category } from '../models/category';
import { User } from '../models/user';
import { Rate } from '../models/rate';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public connected: boolean = true;
  // public connected:boolean = false

  user1: User = new User(
    'user1@example.com',
    '12345678',
    'user1',
    'garcia',
    'spain',
    12341234,
    'url'
  );

  constructor() {}

  // valores inventados para pruebas
  rate1 = new Rate(
    'Paco',
    'https://cdn.businessinsider.es/sites/navi.axelspringer.es/public/media/image/2018/03/nariz-selfie.jpg?tf=3840x',
    5,
    'Muy majo'
  );
  rate2 = new Rate(
    'Ana',
    'https://imagenes.20minutos.es/files/image_1920_1080/uploads/imagenes/2023/09/04/joven-rubia-sonriendo-feliz-haciendo-selfie-junto-al-telefono-inteligente-en-la-playa.jpeg',
    1,
    'Es un estafador'
  );
  rate3 = new Rate(
    'Julian',
    'https://img.europapress.es/fotoweb/fotonoticia_20140807141015_640.jpg',
    3,
    'Bla bla bla bla Bla bla bla bla Bla bla bla bla Bla bla bla bla'
  );

  public user: User = {
    email: 'a@mail',
    password: 'Aa111111',
    name: 'Paco',
    surname: 'Pi',
    phoneNumber: 123,
    location: '28029, Madrid',
    photo:
      '../../assets/img/primer-plano-mujer-joven-al-aire-libre_1098-1638.avif',
    rates: [this.rate1, this.rate2, this.rate3],
  };

 
  public user2: User = {email:'a@mail', password:'Aa111111', name:'Leopoldo', surname:'Gutiérrez',phoneNumber: 123, location:'28029, Madrid', photo: '../../assets/img/primer-plano-mujer-joven-al-aire-libre_1098-1638.avif', rates: [this.rate1]}
  public user3: User = {email:'a@mail', password:'Aa111111', name:'Elena', surname:'Fernández',phoneNumber: 123, location:'28029, Madrid', photo: '../../assets/img/primer-plano-mujer-joven-al-aire-libre_1098-1638.avif', rates: [this.rate2]}
  public user4: User = {email:'a@mail', password:'Aa111111', name:'Conchi', surname:'García',phoneNumber: 123, location:'28029, Madrid', photo: '../../assets/img/primer-plano-mujer-joven-al-aire-libre_1098-1638.avif', rates: [this.rate2, this.rate3]}

  public preferences : Category[] = []

 
}
