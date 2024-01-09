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

//array categorías exitentes: añadir icono en bbdd y así no hay que hacer esto?
iconCat = [
  {id_category: 13, title: 'abogados', icon: 'fa-solid fa-scale-balanced'},
  {id_category: 3, title: 'albañilería', icon: 'fa-solid fa-trowel'},
  {id_category: 4, title: 'carpintería', icon: 'fa-solid fa-hammer'},
  {id_category: 6, title: 'carrocería', icon: 'fa-solid fa-car-side'},
  {id_category: 12, title: 'clases', icon: 'fa-solid fa-person-chalkboard'},
  {id_category: 14, title: 'contabilidad', icon: 'fa-solid fa-file-invoice-dollar'},
  {id_category: 15, title: 'deporte', icon: 'fa-solid fa-table-tennis-paddle-ball'},
  {id_category: 7, title: 'diseño web', icon: 'fa-solid fa-pen-ruler'},
  {id_category: 2, title: 'electricidad', icon: 'fa-solid fa-plug'},
  {id_category: 18, title: 'estética', icon: 'fa-solid fa-spa'},
    {id_category: 1, title: 'fontanería', icon: 'fa-solid fa-faucet-drip'},
  {id_category: 19, title: 'fotografía', icon: 'fa-solid fa-camera-retro'},
  {id_category: 11, title: 'idiomas', icon: 'fa-solid fa-language'},
  {id_category: 9, title: 'informática', icon: 'fa-solid fa-computer'},
  {id_category: 17, title: 'maquillaje', icon: 'fa-solid fa-paintbrush'},
  {id_category: 5, title: 'mecánica', icon: 'fa-solid fa-car-side'},
  {id_category: 10, title: 'música', icon: 'fa-solid fa-music'},
  {id_category: 16, title: 'peluquería', icon: 'fa-solid fa-scissors'},
  {id_category: 8, title: 'programación', icon: 'fa-solid fa-laptop-code'},  
]

}


