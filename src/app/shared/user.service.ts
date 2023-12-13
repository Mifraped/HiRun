import { Injectable } from '@angular/core';
import { Category } from '../models/category';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public connected:boolean = true
  // public connected:boolean = false
  
  // valores inventados para pruebas
  public user: User = {email:'a@mail', password:'Aa111111', name:'Paco', surname:'Pi',phoneNumber: 123, location:'Madrid', photo: '../../../assets/profile_img/example_user.jpg'}

  public preferences : Category[] = []

  constructor() { }
}
