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

  public searchTerm: string;
  public rating: string;
  public minPrice: number = 0;
  public maxPrice: number = 100;

  constructor(private http: HttpClient) {}

  getNewestBusiness(): Observable<any> {
    return this.http.get(this.url + '/novedades');
  }

  getPopularBusiness(): Observable<any> {
    return this.http.get(this.url + '/bestRated');
  }

  searchResults: any[];

  getResults(
    searchTerm: string,
    ratingFilter: number,
    minPrice: number,
    maxPrice: number
  ) {
    console.log('getResults called'); // Log at the start of the function

    console.log('searchTerm:', searchTerm); // Log outside the if condition
    console.log('ratingFilter:', ratingFilter); // Log outside the if condition
    console.log('minPrice:', minPrice); // Log outside the if condition
    console.log('maxPrice:', maxPrice); // Log outside the if condition

    let params = new HttpParams();
    if (searchTerm) {
      params = params.set('searchTerm', searchTerm);
    }
    if (ratingFilter > 0) {
      params = params.set('rating', ratingFilter);
    }
    if (minPrice != null) {
      // Check if minPrice is not null or undefined
      params = params.set('minPrice', minPrice.toString());
    }
    if (maxPrice != null) {
      // Check if maxPrice is not null or undefined
      params = params.set('maxPrice', maxPrice.toString());
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
