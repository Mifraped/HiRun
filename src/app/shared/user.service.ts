import { Injectable } from '@angular/core';
import { Category } from '../models/category';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public connected: boolean = true;

  constructor() {}

  // valores inventados para pruebas
  public user: User = {
    email: 'a@mail',
    password: 'Aa111111',
    name: 'Paco',
    surname: 'Pi',
    phoneNumber: 123,
    location: '28029, Madrid',
    photo:
      '../../assets/img/primer-plano-mujer-joven-al-aire-libre_1098-1638.avif',
    rates: 47,
  };
  public preferences: Category[] = [];

  // public connected:boolean = false
}
