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
import { OrderByService } from 'src/app/shared/order-by.service';

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
  ratingFilter: number;
  minPrice: number;
  maxPrice: number;
  categories: string[];
  otherValues: string[];
  selectedOrderBy: string;
  categoryName: string;

  results: any[];
  private isReordering = false;

  constructor(
    public dialog: MatDialog,
    private dialogService: DialogService,
    private BusinessService: BusinessService,
    public headerNavbarService: HeaderNavbarService,
    private filtersService: FiltersService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private order: OrderByService
  ) {
    this.headerNavbarService.showHeader = true;
  }

  onOrderByChange(event: any) {
    // Update selectedOrderBy when the user makes a selection
    this.selectedOrderBy = event.target.value;
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      console.log(params);

      const displayName = params['displayName'];
      const searchTerm = params['searchTerm'];
      const ratingFilter = params['rating'];
      const minPrice = Number(params['minPrice']);
      const maxPrice = Number(params['maxPrice']);
      const categories = params['categories']
        ? params['categories'].split(',')
        : [];
      const otherValues = params['other'] ? params['other'].split(',') : [];
      this.categoryName = displayName;

      this.filtersService.updateSearchTerm(searchTerm);

      this.searchTerm = this.filtersService.getCurrentSearchTerm();

      this.order.currentOrderBy.subscribe((orderBy) => {
        this.filtersService
          .getResults(
            searchTerm,
            ratingFilter,
            minPrice,
            maxPrice,
            categories,
            otherValues,
            orderBy // Pass the selected order by value
          )
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
    });
  }

  onOrderBySelected(orderBy: string) {
    this.isReordering = true;
    this.filtersService
      .getResults(
        this.searchTerm,
        this.ratingFilter,
        this.minPrice,
        this.maxPrice,
        this.categories,
        this.otherValues,
        orderBy // Pass the selected order by value
      )
      .subscribe((results) => {
        console.log('results:', results);
        this.results = results;
        this.isReordering = false;
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
