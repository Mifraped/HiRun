import { Component } from '@angular/core';
import { Service } from 'src/app/models/service';
import { UserService } from 'src/app/shared/user.service';
import { ServiceService } from 'src/app/shared/service.service';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent {

thisService = this.serviceService.service

jobs= this.thisService.jobs

constructor(public userService:UserService, public serviceService:ServiceService){}


}
