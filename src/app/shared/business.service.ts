import { Injectable } from '@angular/core';
import { Business } from '../models/business';
import { User } from '../models/user';
import { Service } from '../models/service';
import { Category } from '../models/category';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class BusinessService {
  private url = 'https://api-hi-run.vercel.app/';
  // private url = 'http://localhost:3000/';

  public logedUserBusinesses: Business[];

  constructor(private http: HttpClient, private userService: UserService) {}

  //nuevo negocio
  postBusiness(newBusiness: Business): Observable<object> {
    console.log('business service OK');
    return this.http.post(`${this.url}business`, newBusiness);
  }

  public getBusiness(): Observable<object> {
    return this.http.get(
      this.url + `business?id_user=${this.userService.user.id_user}`
    );
  }

  public getBusinessById(id:number):Observable<object> {
    return this.http.get(
      this.url + `business?id_business=${id}`
    );
  }

  public deleteBusiness(id:number): Observable<object> {
    return this.http.delete(this.url + `business?id_business=${id}`
    );
  }

  //instancias falsas, borrar después
  service1: Service = {
    title: 'Servicio menor',
    price: 75,
    description: 'Arreglo de grifos',
    duration: 45,
  };
  service2: Service = {
    title: 'Servicio mediano',
    price: 150,
    description:
      'Calefacción, conexión de tuberías de electrodimésticos, descripción larga muy larga para hacer pruebas de maquetación',
    duration: 120,
  };
  service3: Service = {
    title: 'Servicio mayor',
    price: 300,
    description: 'Servicios importantes de fontanería',
    duration: 240,
  };

  serviceArray: Service[] = [this.service1, this.service2, this.service3];

  provider: User = {
    email: 'b@mail',
    password: 'Aa111111',
    name: 'Eugenia',
    surname: 'Fernández',
    phoneNumber: 123,
    location: 'Madrid',
    photo: '../../../assets/profile_img/example_provider.jpg',
  };

  cat1: Category = { id_category: 1, title: 'Fontanería' };
  cat2: Category = { id_category: 2, title: 'Estética' };
  cat3: Category = { id_category: 3, title: 'Peluquería' };
  cat4: Category = { id_category: 4, title: 'Diseño' };
  cat5: Category = { id_category: 5, title: 'Maquillaje' };
  cat6: Category = { id_category: 6, title: 'Música' };
  cat7: Category = { id_category: 7, title: 'Informática' };
  cat8: Category = { id_category: 8, title: 'Cuidados' };
  cat9: Category = { id_category: 9, title: 'Hogar' };
  cat10: Category = { id_category: 10, title: 'Mascotas' };
  cat11: Category = { id_category: 11, title: 'Fontanería2' };
  cat12: Category = { id_category: 12, title: 'Estética2' };
  cat13: Category = { id_category: 13, title: 'Peluquería2' };
  cat14: Category = { id_category: 14, title: 'Diseño2' };
  cat15: Category = { id_category: 15, title: 'Maquillaje2' };
  cat16: Category = { id_category: 16, title: 'Música2' };
  cat17: Category = { id_category: 17, title: 'Informática2' };
  cat18: Category = { id_category: 18, title: 'Cuidados2' };
  cat19: Category = { id_category: 19, title: 'Hogar2' };
  cat20: Category = { id_category: 20, title: 'Mascotas2' };

  allCat = [
    this.cat1,
    this.cat2,
    this.cat3,
    this.cat4,
    this.cat5,
    this.cat6,
    this.cat7,
    this.cat8,
    this.cat9,
    this.cat10,
    this.cat11,
    this.cat12,
    this.cat13,
    this.cat14,
    this.cat15,
    this.cat16,
    this.cat17,
    this.cat18,
    this.cat19,
    this.cat20,
  ];

  business: Business = {
    provider: 1,
    title: 'Business example 1',
    services: [this.service1, this.service2, this.service3],
    photo: '../../../assets/business_img/example.jpg',
    rating: 2,
    tags: [this.cat11, this.cat12, this.cat16],
  };
  business2: Business = {
    provider: 1,
    title: 'Business example 2',
    services: [this.service1, this.service2, this.service3],
    photo: '../../../assets/business_img/example.jpg',
    rating: 3.5,
    tags: [this.cat1, this.cat10],
  };
  business3: Business = {
    provider: 1,
    title: 'Business example 3',
    services: [this.service1, this.service2, this.service3],
    photo: '../../../assets/business_img/example.jpg',
    rating: 3.5,
    tags: [this.cat11, this.cat12, this.cat16],
  };
  business4: Business = {
    provider: 1,
    title: 'Business example 4',
    services: [this.service1, this.service2, this.service3],
    photo: '../../../assets/business_img/example.jpg',
    rating: 3.5,
    tags: [this.cat11, this.cat12, this.cat16],
  };

  businessArray: Business[] = [
    this.business,
    this.business2,
    this.business3,
    this.business4,
  ];
}
