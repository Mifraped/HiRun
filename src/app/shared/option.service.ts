import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject  } from 'rxjs';
import { BusinessOpt } from '../models/business-opt';
import { ResponseBusOpt } from '../models/response-bus-opt';

@Injectable({
  providedIn: 'root'
})
export class OptionService {

   private url = "https://api-hi-run.vercel.app/bus-option" 
  //  private url = "http://localhost:3000/bus-option" 

  constructor(private http: HttpClient) { } 

  postBusinessOpt(newBusOpt:BusinessOpt): Observable<ResponseBusOpt> {
    return this.http.post<ResponseBusOpt>(this.url, newBusOpt );
  }
}
