import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/user.service';


@Component({
  selector: 'app-service-card',
  templateUrl: './service-card.component.html',
  styleUrls: ['./service-card.component.css']
})
export class ServiceCardComponent {
@Input() service:any

bookService(){
  if (this.userService.connected){
this.router.navigate([`/book-service/:${this.service.serviceId}`]);
   
  }else{
    alert('inicia sesión para reservar')
    this.router.navigate(['/login'])
  }
  

}

cardExtended:boolean = false

expandInfo(){
  this.cardExtended=!this.cardExtended
  console.log(this.cardExtended)
}
constructor(private router: Router, private userService:UserService) { }
}
