import { Component, Input, OnInit } from '@angular/core';
import { Job } from 'src/app/models/job';
import { Service } from 'src/app/models/service';
import { ServiceService } from 'src/app/shared/service.service';

@Component({
  selector: 'app-service-card-medium',
  templateUrl: './service-card-medium.component.html',
  styleUrls: ['./service-card-medium.component.css']
})
export class ServiceCardMediumComponent {

  service = this.serviceService.service
  
  constructor(public serviceService:ServiceService){}
}
