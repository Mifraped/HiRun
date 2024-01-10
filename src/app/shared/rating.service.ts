import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from './user.service';
import { Rate } from '../models/rate';

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  // private url = 'https://api-hi-run.vercel.app/rating';
  private url = 'http://localhost:3000/rating';

  constructor(private http:HttpClient, private userService:UserService) { }

  public checkIfRatingExists(id_user:number, id_service:number):Observable<object> {    
    return this.http.get(`${this.url}?id_user=${id_user}&id_service=${id_service}`);
  }

  public postRating(newRating:Rate){
    return this.http.post(this.url, newRating)
  }

  public putRating(updatedRating:Rate){
    return this.http.put(this.url, updatedRating)
  }


  public getRates(): Observable<object> {    
    return this.http.get(`${this.url}?id_provider=${this.userService.user.id_user}`);
  }

  public getAvgUserRates(): Observable<object> {    
    return this.http.get(`${this.url}?id_user_avg=${this.userService.user.id_user}`);
  }

  public getAvgBusinessRates(id_business:number): Observable<object> {    
    return this.http.get(`${this.url}?id_business=${id_business}`);
  }
}
