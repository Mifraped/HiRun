import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FiltersService {
  private url = 'http://localhost:3000';
  // private url = 'https://api-hi-run.vercel.app/';

  constructor(private http: HttpClient) {}

  getNewestBusiness(): Observable<any> {
    return this.http.get(this.url + '/novedades');
  }

  getResults(): Observable<any> {
    return this.http.get(this.url + '/results');
  }
}
