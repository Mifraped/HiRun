import { Injectable } from '@angular/core';
import { Category } from '../models/category';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public connected: boolean = false;

  constructor() {}

  // valores inventados para pruebas
  public user: User = {
    email: 'a@mail',
    password: 'Aa111111',
    name: 'Paco',
    surname: 'Pi',
    phoneNumber: 123,
    location: 'Madrid',
    photo: 'url',
  };
  public preferences: Category[] = [];

  // public connected:boolean = false
}
