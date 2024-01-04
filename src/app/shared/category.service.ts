import { Injectable } from '@angular/core';
import { Category } from '../models/category';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject  } from 'rxjs';
import { ResponseCategory } from '../models/response-category';
import { BusinessCat } from '../models/business-cat';
import { ResponseBusCat } from '../models/response-bus-cat';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  //para obtener categorías
  private url1 = "https://api-hi-run.vercel.app/category" 
  // private url1 = "http://localhost:3000/category" 

  //para añadir categorías a bussines_cat
  private url2 = "https://api-hi-run.vercel.app/business-cat" 
  // private url2 = "http://localhost:3000/business-cat" 

    //para obtener preferencias de usuario
  private url3 = "https://api-hi-run.vercel.app/preferences" 
  // private url3 = "http://localhost:3000/preferences"

  private allCategoriesSubject = new BehaviorSubject<Category[]>([]);
  public allCategories: Category[]

  constructor(private http: HttpClient, private userService: UserService) { 
   
  }  

  getAllCat(): Observable<ResponseCategory> {
    return this.http.get<ResponseCategory>(this.url1);
  }

  postBusinessCat(newBusCat:BusinessCat): Observable<ResponseBusCat> {
    return this.http.post<ResponseBusCat>(this.url2, newBusCat );
  }

  getBusinessCat(busId:number):  Observable<ResponseBusCat> {
    return this.http.get<ResponseBusCat>(`${this.url2}?business=${busId}`);;
  }
  
  deleteBusinessCat(id_business_cat:number):Observable<ResponseBusCat> {
    return this.http.delete<ResponseBusCat>(`${this.url2}?id_business_cat=${id_business_cat}`);
  }
  deleteAllBusinessCat(id_business:number):Observable<ResponseBusCat> {
    return this.http.delete<ResponseBusCat>(`${this.url2}?business=${id_business}`);
  }

  public postPreferences(catArray:Category[], id_user:number): Observable<object> {
    return this.http.post(`${this.url3}?id_user=${id_user}`, catArray)
  }

  public putPreferences(catArray:Category[]): Observable<object> {
    return this.http.put(`${this.url3}?id_user=${this.userService.user.id_user}`, catArray)
  }

  public getPreferences(): Observable<object> {
    return this.http.get(`${this.url3}?id_user=${this.userService.user.id_user}`)
  }

}


