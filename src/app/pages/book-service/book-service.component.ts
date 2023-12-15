import { Component } from '@angular/core';
import { ServiceService } from 'src/app/shared/service.service';
import { UserService } from 'src/app/shared/user.service';


@Component({
  selector: 'app-book-service',
  templateUrl: './book-service.component.html',
  styleUrls: ['./book-service.component.css'],
  
})
export class BookServiceComponent {

  user=this.userService.user
  provider=this.serviceService.provider
  service=this.serviceService.service


  constructor(private userService:UserService, private serviceService:ServiceService){}
}
