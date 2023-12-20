import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject  } from 'rxjs';
import { TimeFrame } from '../models/time-frame';
import { ResponseTimeframe } from '../models/response-timeframe';

@Injectable({
  providedIn: 'root'
})
export class TimeframeService {

  constructor(private http: HttpClient) { }


private url= "https://api-hi-run.vercel.app/timeframe" 
// private url = "http://localhost:3000/timeframe" 

  postTimeframe(tf:TimeFrame): Observable<ResponseTimeframe> {
    return this.http.post<ResponseTimeframe>(this.url, tf );
  }

}
