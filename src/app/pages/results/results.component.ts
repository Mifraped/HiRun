import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { OrderByComponent } from 'src/app/components/order-by/order-by.component';
import { DialogService } from 'src/app/shared/dialog.service';
import { Business } from 'src/app/models/business';
import { BusinessService } from 'src/app/shared/business.service';
import { UserService } from 'src/app/shared/user.service';
import { HeaderNavbarService } from 'src/app/shared/header-navbar.service';
import { FiltersService } from 'src/app/shared/filters.service';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  searchTerm: string;

  results: any[];

  constructor(
    public dialog: MatDialog,
    private dialogService: DialogService,
    private BusinessService: BusinessService,
    public headerNavbarService: HeaderNavbarService,
    private filtersService: FiltersService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.headerNavbarService.showHeader = true;
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const searchTerm = params['searchTerm'];
      const ratingFilter = params['rating'];
      const minPrice = Number(params['minPrice']);
      const maxPrice = Number(params['maxPrice']);
      const otherValues = params['other'] ? params['other'].split(',') : [];

      this.filtersService.updateSearchTerm(searchTerm);

      this.searchTerm = this.filtersService.getCurrentSearchTerm();

      this.filtersService
        .getResults(searchTerm, ratingFilter, minPrice, maxPrice, otherValues)
        .subscribe((results) => {
          console.log('results:', results);
          this.results = results;
          if (results.length === 0) {
            this.snackBar.open(
              'No results matching your search were found.',
              'Close',
              {
                duration: 2000,
                panelClass: ['snackbar-result'],
              }
            );
          }
        });
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
