import { Component } from '@angular/core';
import { ServiceService } from 'src/app/shared/service.service';
import { Service } from 'src/app/models/service';
import { Job } from 'src/app/models/job';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css'],
})
export class ResultsComponent {
  public service: Service = this.ServiceService.service;
  servicio1: Service = this.ServiceService.service;

  constructor(
    public ServiceService: ServiceService,
    public UserService: UserService
  ) {}
}
