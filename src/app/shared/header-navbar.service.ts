import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HeaderNavbarService {

  public showHeader: boolean = true;
  public showNavbar: boolean = true;

  constructor() { }
}
