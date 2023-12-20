import { Injectable } from '@angular/core';
import { Category } from '../models/category';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject  } from 'rxjs';
import { ResponseCategory } from '../models/response-category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private url = "https://api-hi-run.vercel.app/category" 
  // private url = "http://localhost:3000/category" 
  private allCategoriesSubject = new BehaviorSubject<Category[]>([]);
  public allCategories: Category[]

  constructor(private http: HttpClient) { 
   
  }  

  getAllCat(): Observable<ResponseCategory> {
    return this.http.get<ResponseCategory>(this.url);
  }
  
}


