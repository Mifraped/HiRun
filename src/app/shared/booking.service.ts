import { Injectable } from '@angular/core';
import { Booking } from '../models/booking';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private url = 'https://api-hi-run.vercel.app/booking';
  // private url = 'http://localhost:3000/booking';

  constructor(private http:HttpClient, private userService: UserService) { }

  public postBooking(newBooking:Booking): Observable<object> {
    
    return this.http.post(`${this.url}`, newBooking);
  }

  public getUserBookings(): Observable<object> {
    return this.http.get(
      this.url + `?user=${this.userService.user.id_user}`
    );
  }

  public deleteBooking(id:number): Observable<object> {
    return this.http.delete(this.url + `?id_booking=${id}`
    );
  }

  public dateTimeData: string = null

  setDateTimeData(dateTime: string): void {
    this.dateTimeData = dateTime;
  }

  getDateTimeData(): string {
    return this.dateTimeData;
  }

  resetDateTimeData(): void {
    this.dateTimeData = null;
  }

}
