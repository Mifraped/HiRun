import { Component } from '@angular/core';
import { ServiceService } from 'src/app/shared/service.service';
import { Service } from 'src/app/models/service';
import { Job } from 'src/app/models/job';
import { UserService } from 'src/app/shared/user.service';
import { MatDialog } from '@angular/material/dialog';
import { OrderByComponent } from 'src/app/components/order-by/order-by.component';

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
    public UserService: UserService,
    public dialog: MatDialog
  ) {}

  openDialog() {
    this.dialog.open(OrderByComponent);
  }
}
