import { Injectable } from '@angular/core';
import { Category } from '../models/category';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public connected: boolean = true;
  // public connected:boolean = false

  constructor() {}

  // valores inventados para pruebas
  public user: User = {email:'a@mail', password:'Aa111111', name:'Paco', surname:'Pi',phoneNumber: 123, location:'28029, Madrid', photo: '../../assets/img/primer-plano-mujer-joven-al-aire-libre_1098-1638.avif', rates: 47}
  public user2: User = {email:'a@mail', password:'Aa111111', name:'Leopoldo', surname:'Gutiérrez',phoneNumber: 123, location:'28029, Madrid', photo: '../../assets/img/primer-plano-mujer-joven-al-aire-libre_1098-1638.avif', rates: 47}
  public user3: User = {email:'a@mail', password:'Aa111111', name:'Elena', surname:'Fernández',phoneNumber: 123, location:'28029, Madrid', photo: '../../assets/img/primer-plano-mujer-joven-al-aire-libre_1098-1638.avif', rates: 47}
  public user4: User = {email:'a@mail', password:'Aa111111', name:'Conchi', surname:'García',phoneNumber: 123, location:'28029, Madrid', photo: '../../assets/img/primer-plano-mujer-joven-al-aire-libre_1098-1638.avif', rates: 47}
  public preferences : Category[] = []



  
}
