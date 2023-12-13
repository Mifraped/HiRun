import { Injectable } from '@angular/core';
import { Service } from '../models/service';
import { User } from '../models/user';
import { Job } from '../models/job';


@Injectable({
  providedIn: 'root'
})
export class ServiceService {

 job1:Job = { title: 'Trabajo menor', price: 75 ,description: 'Arreglo de grifos',duration: 45,} 
 job2:Job = { title: 'Trabajo mediano', price: 150 ,description: 'Calefacción, conexión de tuberías de electrodimésticos',duration: 120,} 
 job3:Job = { title: 'Trabajo mayor', price: 300 ,description: 'Trabajos importantes de fontanería',duration: 240,} 



provider:User = {email:'b@mail', password:'Aa111111', name:'Eugenia', surname:'Fernández',phoneNumber: 123, location:'Madrid', photo: '../../../assets/profile_img/example_provider.jpg'}

service :Service={provider: this.provider, title: 'Service example', jobs: [this.job1, this.job2, this.job3],photo: '../../../assets/service_img/example.jpg', rating:3.5 } 

  constructor() { }
}
