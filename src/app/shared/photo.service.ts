import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  // private url = "https://api-hi-run.vercel.app/" 
  private url = "http://localhost:3000/"

  constructor(private http: HttpClient) { }

  public uploadPhoto(photo: FormData):Observable<object>{
    return this.http.post(this.url + `photo`, photo)
  }
}
