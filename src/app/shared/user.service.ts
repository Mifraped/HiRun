import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public connected: boolean = false;

  constructor() {}
}
