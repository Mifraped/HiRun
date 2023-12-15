import { Component } from '@angular/core';
import { Service } from 'src/app/models/service';
import { ServiceService } from 'src/app/shared/service.service';

@Component({
  selector: 'app-requested-service',
  templateUrl: './requested-service.component.html',
  styleUrls: ['./requested-service.component.css']
})
export class RequestedServiceComponent {


  constructor(public serviceService: ServiceService){

  }
}
