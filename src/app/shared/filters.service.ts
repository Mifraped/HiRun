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
  private _minPrice: number = 0;
  private _maxPrice: number = 100;
  public categories: string[] = [];
  public options: string[] = [];
  public orderBy: string;

  constructor(private http: HttpClient) {}

  getNewestBusiness(): Observable<any> {
    return this.http.get(this.url + '/novedades');
  }

  getPopularBusiness(): Observable<any> {
    return this.http.get(this.url + '/bestRated');
  }

  setOptions(options: string[]) {
    this.options = options;
    localStorage.setItem('options', JSON.stringify(options));
  }

  clearOptions() {
    this.options = undefined;
    localStorage.removeItem('options');
  }

  searchResults: any[];

  getResults(
    searchTerm: string,
    ratingFilter: number,
    minPrice: number,
    maxPrice: number,
    categories: string[],
    options: string[],
    orderBy: string // Add this parameter
  ) {
    console.log('getResults called');
    console.log('searchTerm:', searchTerm);
    console.log('ratingFilter:', ratingFilter);
    console.log('minPrice:', minPrice);
    console.log('maxPrice:', maxPrice);
    console.log('categories:', categories);
    console.log('options:', options);
    console.log('orderBy:', orderBy); // Log the orderBy parameter

    let params = new HttpParams();

    if (searchTerm) {
      params = params.set('searchTerm', searchTerm);
    }
    if (ratingFilter !== null && !isNaN(ratingFilter)) {
      params = params.set('ratingFilter', ratingFilter.toString());
    }
    if (!isNaN(minPrice)) {
      params = params.set('minPrice', minPrice.toString());
    }
    if (!isNaN(maxPrice)) {
      params = params.set('maxPrice', maxPrice.toString());
    }
    if (categories && categories.length > 0) {
      categories.forEach((category) => {
        params = params.append('category', category);
      });
    }
    if (options && options.length > 0) {
      options.forEach((option) => {
        params = params.append('other', option);
      });
    }
    if (orderBy) {
      // Add this if statement
      params = params.set('orderBy', orderBy);
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
