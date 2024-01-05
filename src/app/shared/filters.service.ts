import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/internal/operators/tap';

@Injectable({
  providedIn: 'root',
})
export class FiltersService {
  private url = 'http://localhost:3000';
  // private url = 'https://api-hi-run.vercel.app';

  public searchTerm: string;
  public rating: string;
  private _minPrice: number = 0;
  private _maxPrice: number = 100;
  public options: string[];

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
    maxPrice: number,
    category: string,
    options: string[]
  ) {
    console.log('getResults called'); // Log at the start of the function

    console.log('searchTerm:', searchTerm); // Log outside the if condition
    console.log('ratingFilter:', ratingFilter); // Log outside the if condition
    console.log('minPrice:', minPrice); // Log outside the if condition
    console.log('maxPrice:', maxPrice); // Log outside the if condition
    console.log('category:', category); // Log outside the if condition
    console.log('options:', options); // Log outside the if condition

    let params = new HttpParams();
    if (searchTerm) {
      params = params.set('searchTerm', searchTerm);
    }
    if (ratingFilter) {
      params = params.set('ratingFilter', ratingFilter.toString());
    }
    if (!isNaN(minPrice)) {
      params = params.set('minPrice', minPrice.toString());
    }
    if (!isNaN(maxPrice)) {
      params = params.set('maxPrice', maxPrice.toString());
    }
    if (category) {
      params = params.set('category', category);
    }

    if (options) {
      params = params.set('options', options.toString());
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

  get minPrice(): number {
    return this._minPrice;
  }

  set minPrice(value: number) {
    this._minPrice = value;
  }

  get maxPrice(): number {
    return this._maxPrice;
  }

  set maxPrice(value: number) {
    this._maxPrice = value;
  }
}
