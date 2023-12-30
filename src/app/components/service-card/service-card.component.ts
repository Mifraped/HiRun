import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Business } from 'src/app/models/business';
import { UserService } from 'src/app/shared/user.service';


@Component({
  selector: 'app-service-card',
  templateUrl: './service-card.component.html',
  styleUrls: ['./service-card.component.css']
})
export class ServiceCardComponent {
@Input() service:any
@Input() business:Business

bookService(){
  if (this.userService.connected){
    console.log(this.business.id_business)
    console.log(this.service.id_service)
  this.router.navigate(['/book-service',this.business.id_business, this.service.id_service]);
   
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
