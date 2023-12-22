import { Injectable } from '@angular/core';
import { Service} from '../models/service';
import { User} from '../models/user';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  // private url = "https://api-hi-run.vercel.app/" 
  private url = "http://localhost:3000/" 
  
  
  constructor(private http: HttpClient) {}

  //nuevo servicio
  postService(newService:Service):Observable<object>{
    
    return this.http.post(`${this.url}service`, newService)
  }

  getAllServices(id_business:number):Observable<object>{
    
    return this.http.get(`${this.url}service?id_business=${id_business}`)
  }
}
