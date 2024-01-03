import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  constructor(private http: HttpClient) {}

  // private uploadUrl = 'https://api-hi-run.vercel.app/img';
  private uploadUrl = 'http://localhost:3000/img';

  public postBusinessImage(
    image: File,
    id_business: number
  ): Observable<object> {
    const formData = new FormData();
    formData.append('photo', image);
    formData.append('id_business', id_business.toString());

    return this.http.post(this.uploadUrl, formData);
  }

  // serverUrl = 'https://api-hi-run.vercel.app/get-image/';
  serverUrl = 'http://localhost:3000/get-image/';
}
