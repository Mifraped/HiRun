import { Component } from '@angular/core';
import { Service } from 'src/app/models/service';
import { ServiceService } from 'src/app/shared/service.service';

@Component({
  selector: 'app-service-provided',
  templateUrl: './service-provided.component.html',
  styleUrls: ['./service-provided.component.css']
})
export class ServiceProvidedComponent {

  public services: Service[]

  constructor(public serviceService: ServiceService){

    this.services = serviceService.services
  }

}
