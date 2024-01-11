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

  dist:boolean =false

  // changeOrderBy(orderBy: string) {
  //   console.log(orderBy)
  //   if (orderBy!='distance'){
  //     this.dist=false
  //     this.orderBySource.next(orderBy);
  //   }else{
  //     this.dist=true
  //   }

  // }
  changeOrderBy(orderBy: string) {
    console.log(orderBy);
    if (orderBy !== 'id_business') {
      this.dist = false;
    } else {
      this.dist = true;
    }
    this.orderBySource.next(orderBy);
  }
}
