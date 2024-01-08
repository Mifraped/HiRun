import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderByService {
  private apiUrl = "https://api-hi-run.vercel.app" 
  // private apiUrl = 'http://localhost:3000';
  private orderBySource = new BehaviorSubject<string>('');
  currentOrderBy = this.orderBySource.asObservable();

  constructor() {}

  changeOrderBy(orderBy: string) {
    this.orderBySource.next(orderBy);
  }
}
