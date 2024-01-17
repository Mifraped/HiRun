import { Injectable } from '@angular/core';
import { Category } from '../models/category';
import { User } from '../models/user';
import { Rate } from '../models/rate';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RequestedService } from '../models/requested-service';
import { Business } from '../models/business';
import { tap } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { map } from 'rxjs/operators';

interface Response {
  data: any;
  error: boolean;
  code: number;
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public connected: boolean;
  public user: User;
  public rates: Rate[];
  public requestedServices: RequestedService[];
  public currentLocation: any;
  public recommendedBusinesses: Business[];
  private url = 'https://api-hi-run.vercel.app/';
  // private url = 'http://localhost:3000/';

  constructor(private http: HttpClient) {
    const userData = localStorage.getItem('user');
    this.loadUser();
    if (userData) {
      this.user = JSON.parse(userData);
    }
  }

  public login(user: any) {
    // Replace with your actual login API endpoint
    return this.http.post(this.url + 'login', user).pipe(
      map((response) => {
        const res = response as Response;
        // If the login is successful, save the user data in localStorage
        if (res && res.data) {
          localStorage.setItem('user', JSON.stringify(res.data));
          this.user = res.data;
        }
        return res;
      })
    );
  }

  public loadUser() {
    const user = localStorage.getItem('user');
    if (user) {
      this.user = JSON.parse(user);
      this.connected = true;
    }
  }

  public logout() {
    // Your logout logic here
    this.user = null;
    this.connected = false;
    localStorage.removeItem('user'); // Add this line
  }

  postUser(newUser: User) {
    return this.http.post(`${this.url}register`, newUser);
  }

  public getUserRequestedServices(): Observable<object> {
    return this.http.get(this.url + `service?id_user=${this.user.id_user}`);
  }

  public getUserInfo(id: number): Observable<object> {
    return this.http.get(`${this.url}user?id_user=${id}`);
  }

  public putUser(newUser: User): Observable<object> {
    return this.http.put(
      this.url + `user?id_user=${this.user.id_user}`,
      newUser
    );
  }

  setUser(user: User) {
    this.user = user;
    localStorage.setItem('user', JSON.stringify(user));
    this.connected = !!user;
  }

  //comprobado que con api local y web local funciona
  // private url = "http://localhost:3000/"
  //registro de un nuevo usuario

  // de aquí abajo: BORRAR! valores inventados para pruebas
  user1: User = new User(
    'user1@example.com',
    '12345678',
    'user1',
    'garcia',
    'spain',
    12341234,
    'url'
  );

  // valores inventados para pruebas
  // rate1 = new Rate(
  //   'Paco',
  //   'https://cdn.businessinsider.es/sites/navi.axelspringer.es/public/media/image/2018/03/nariz-selfie.jpg?tf=3840x',
  //   5,
  //   'Muy majo'
  // );
  // rate2 = new Rate(
  //   'Ana',
  //   'https://imagenes.20minutos.es/files/image_1920_1080/uploads/imagenes/2023/09/04/joven-rubia-sonriendo-feliz-haciendo-selfie-junto-al-telefono-inteligente-en-la-playa.jpeg',
  //   1,
  //   'Es un estafador'
  // );
  // rate3 = new Rate(
  //   'Julian',
  //   'https://img.europapress.es/fotoweb/fotonoticia_20140807141015_640.jpg',
  //   3,
  //   'Bla bla bla bla Bla bla bla bla Bla bla bla bla Bla bla bla bla'
  // );

  // public user: User = {
  //   email: 'a@mail',
  //   password: 'Aa111111',
  //   name: 'Paco',
  //   surname: 'Pi',
  //   phoneNumber: 123,
  //   location: '28029, Madrid',
  //   photo:
  //     '../../assets/img/primer-plano-mujer-joven-al-aire-libre_1098-1638.avif',
  //   rates: [this.rate1, this.rate2, this.rate3],
  // };

  // public user2: User = {
  //   email: 'a@mail',
  //   password: 'Aa111111',
  //   name: 'Leopoldo',
  //   surname: 'Gutiérrez',
  //   phoneNumber: 123,
  //   location: '28029, Madrid',
  //   photo:
  //     '../../assets/img/primer-plano-mujer-joven-al-aire-libre_1098-1638.avif',
  //   rates: [this.rate1],
  // };
  // public user3: User = {
  //   email: 'a@mail',
  //   password: 'Aa111111',
  //   name: 'Elena',
  //   surname: 'Fernández',
  //   phoneNumber: 123,
  //   location: '28029, Madrid',
  //   photo:
  //     '../../assets/img/primer-plano-mujer-joven-al-aire-libre_1098-1638.avif',
  //   rates: [this.rate2],
  // };
  // public user4: User = {
  //   email: 'a@mail',
  //   password: 'Aa111111',
  //   name: 'Conchi',
  //   surname: 'García',
  //   phoneNumber: 123,
  //   location: '28029, Madrid',
  //   photo:
  //     '../../assets/img/primer-plano-mujer-joven-al-aire-libre_1098-1638.avif',
  //   rates: [this.rate2, this.rate3],
  // };

  public preferences: Category[] = [];
}
