import { Component } from '@angular/core';
import { Service } from 'src/app/models/service';
import { UserService } from 'src/app/shared/user.service';
import { ServiceService } from 'src/app/shared/service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent {

service = this.serviceService.service

jobs= this.service.jobs

constructor(public userService:UserService, public serviceService:ServiceService, private router:Router){}

contactProvider(){
  //pendiente lógica, tiene que llevarte a chat con el usuario service.provider
this.router.navigate(['/chat'])
}

}
