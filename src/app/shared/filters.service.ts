import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/internal/operators/tap';

@Injectable({
  providedIn: 'root',
})
export class FiltersService {
  // private url = 'http://localhost:3000';
  private url = 'https://api-hi-run.vercel.app';

  private searchTerm: string;

  constructor(private http: HttpClient) {}

  getNewestBusiness(): Observable<any> {
    return this.http.get(this.url + '/novedades');
  }

  searchResults: any[];

  getResults(searchTerm?: string, ratingFilter?: string) {
    let params = new HttpParams();
    if (searchTerm) {
      params = params.set('searchTerm', searchTerm);
    }
    if (ratingFilter) {
      params = params.set('rating', ratingFilter);
    }
    return this.http
      .get<any[]>(this.url + '/results', { params })
      .pipe(tap((results) => (this.searchResults = results)));
  }

  updateSearchTerm(searchTerm: string): void {
    this.searchTerm = searchTerm;
  }

  getCurrentSearchTerm(): string {
    return this.searchTerm;
  }
}
