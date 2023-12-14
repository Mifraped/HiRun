import { Injectable } from '@angular/core';
import { Service } from '../models/service';
import { User } from '../models/user';
import { Job } from '../models/job';
import { Category } from '../models/category';


@Injectable({
  providedIn: 'root'
})
export class ServiceService {

 job1:Job = { title: 'Trabajo menor', price: 75 ,description: 'Arreglo de grifos',duration: 45,} 
 job2:Job = { title: 'Trabajo mediano', price: 150 ,description: 'Calefacción, conexión de tuberías de electrodimésticos',duration: 120,} 
 job3:Job = { title: 'Trabajo mayor', price: 300 ,description: 'Trabajos importantes de fontanería',duration: 240,} 



provider:User = {email:'b@mail', password:'Aa111111', name:'Eugenia', surname:'Fernández',phoneNumber: 123, location:'Madrid', photo: '../../../assets/profile_img/example_provider.jpg'}

service :Service={provider: this.provider, title: 'Service example', jobs: [this.job1, this.job2, this.job3],photo: '../../../assets/service_img/example.jpg', rating:3.5 } 

cat1:Category ={categoryId: 1, title: 'Fontanería'}
cat2:Category ={categoryId: 2, title: 'Estética'}
cat3:Category ={categoryId: 3, title: 'Peluquería'}
cat4:Category ={categoryId: 4, title: 'Diseño'}
cat5:Category ={categoryId: 5, title: 'Maquillaje'}
cat6:Category ={categoryId: 6, title: 'Música'}
cat7:Category ={categoryId: 7, title: 'Informática'}
cat8:Category ={categoryId: 8, title: 'Cuidados'}
cat9:Category ={categoryId: 9, title: 'Hogar'}
cat10:Category ={categoryId: 10, title: 'Mascotas'}
cat11:Category ={categoryId: 11, title: 'Fontanería2'}
cat12:Category ={categoryId: 12, title: 'Estética2'}
cat13:Category ={categoryId: 13, title: 'Peluquería2'}
cat14:Category ={categoryId: 14, title: 'Diseño2'}
cat15:Category ={categoryId: 15, title: 'Maquillaje2'}
cat16:Category ={categoryId: 16, title: 'Música2'}
cat17:Category ={categoryId: 17, title: 'Informática2'}
cat18:Category ={categoryId: 18, title: 'Cuidados2'}
cat19:Category ={categoryId: 19, title: 'Hogar2'}
cat20:Category ={categoryId: 20, title: 'Mascotas2'}

 allCat = [this.cat1, this.cat2, this.cat3, this.cat4, this.cat5, this.cat6, this.cat7, this.cat8, this.cat9, this.cat10, this.cat11, this.cat12, this.cat13, this.cat14, this.cat15, this.cat16, this.cat17, this.cat18,this.cat19, this.cat20] 
 
 

  constructor() { }
}
