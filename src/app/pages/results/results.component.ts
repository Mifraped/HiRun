import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { OrderByComponent } from 'src/app/components/order-by/order-by.component';
import { DialogService } from 'src/app/shared/dialog.service';
import { Business } from 'src/app/models/business';
import { BusinessService } from 'src/app/shared/business.service';
import { UserService } from 'src/app/shared/user.service';
import { HeaderNavbarService } from 'src/app/shared/header-navbar.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css'],
})
export class ResultsComponent implements OnInit {
  dialogRef: MatDialogRef<OrderByComponent>;
  public business: Business = this.BusinessService.business;
  negocio1: Business = this.BusinessService.business;
  showHeader = true;

  constructor(
    public dialog: MatDialog,
    private dialogService: DialogService,
    private BusinessService: BusinessService,
    public headerNavbarService: HeaderNavbarService
  ) {
    this.headerNavbarService.showHeader = true;
  }

  ngOnInit() {
    this.dialogService.closeDialog$.subscribe(() => {
      if (this.dialogRef) {
        this.dialogRef.close();
      }
    });
  }

  openDialog() {
    if (!this.dialogRef || !this.dialogRef.componentInstance) {
      this.dialogRef = this.dialog.open(OrderByComponent, {
        panelClass: 'dialogo-order-by',
        position: {
          top: '20%',
          left: '',
        },
      });
    }
  }
}
