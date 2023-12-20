import { Injectable } from '@angular/core';
import { Business } from '../models/business';
import { User } from '../models/user';
import { Service} from '../models/service';
import { Category } from '../models/category';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BusinessService {
  
  private url = "https://api-hi-run.vercel.app/" 
  // private url = "http://localhost:3000/" 
  
  
  constructor(private http: HttpClient) {
    
  }
  
  //nuevo negocio
  postBusiness(newBusiness:Business):Observable<object>{
    console.log('business service OK')
    return this.http.post(`${this.url}new-business`, newBusiness)
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

  cat1: Category = { categoryId: 1, title: 'Fontanería' };
  cat2: Category = { categoryId: 2, title: 'Estética' };
  cat3: Category = { categoryId: 3, title: 'Peluquería' };
  cat4: Category = { categoryId: 4, title: 'Diseño' };
  cat5: Category = { categoryId: 5, title: 'Maquillaje' };
  cat6: Category = { categoryId: 6, title: 'Música' };
  cat7: Category = { categoryId: 7, title: 'Informática' };
  cat8: Category = { categoryId: 8, title: 'Cuidados' };
  cat9: Category = { categoryId: 9, title: 'Hogar' };
  cat10: Category = { categoryId: 10, title: 'Mascotas' };
  cat11: Category = { categoryId: 11, title: 'Fontanería2' };
  cat12: Category = { categoryId: 12, title: 'Estética2' };
  cat13: Category = { categoryId: 13, title: 'Peluquería2' };
  cat14: Category = { categoryId: 14, title: 'Diseño2' };
  cat15: Category = { categoryId: 15, title: 'Maquillaje2' };
  cat16: Category = { categoryId: 16, title: 'Música2' };
  cat17: Category = { categoryId: 17, title: 'Informática2' };
  cat18: Category = { categoryId: 18, title: 'Cuidados2' };
  cat19: Category = { categoryId: 19, title: 'Hogar2' };
  cat20: Category = { categoryId: 20, title: 'Mascotas2' };

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
    provider: this.provider,
    title: 'Business example 1',
    services: [this.service1, this.service2, this.service3],
    photo: '../../../assets/business_img/example.jpg',
    rating: 2,
    tags: [this.cat11, this.cat12, this.cat16],
  };
  business2: Business = {
    provider: this.provider,
    title: 'Business example 2',
    services: [this.service1, this.service2, this.service3],
    photo: '../../../assets/business_img/example.jpg',
    rating: 3.5,
    tags: [this.cat1, this.cat10],
  };
  business3: Business = {
    provider: this.provider,
    title: 'Business example 3',
    services: [this.service1, this.service2, this.service3],
    photo: '../../../assets/business_img/example.jpg',
    rating: 3.5,
    tags: [this.cat11, this.cat12, this.cat16],
  };
  business4: Business = {
    provider: this.provider,
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
