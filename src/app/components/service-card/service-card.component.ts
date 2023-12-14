import { Component, Input, OnInit } from '@angular/core';
import { Job } from 'src/app/models/job';
import { Service } from 'src/app/models/service';
import { ServiceService } from 'src/app/shared/service.service';

@Component({
  selector: 'app-service-card',
  templateUrl: './service-card.component.html',
  styleUrls: ['./service-card.component.css'],
})
export class ServiceCardComponent implements OnInit {
  @Input() service: Service;

  jobs: Job[];

  jobtext: string;

  jobToText(jobArray) {}

  constructor(public serviceService: ServiceService) {}

  ngOnInit() {
    this.jobs = this.service ? this.service.jobs : [];
  }
}
