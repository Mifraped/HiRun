import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

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

  results: any[];

  getResults(searchTerm: string): Observable<any> {
    return this.http
      .get(`${this.url}/results?searchTerm=${encodeURIComponent(searchTerm)}`)
      .pipe(tap((results) => (this.results = results)));
  }
}
