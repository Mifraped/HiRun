import { Component, OnInit, Input } from '@angular/core';
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
import { GeolocationService } from 'src/app/shared/geolocation.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css'],
})
export class ResultsComponent implements OnInit {
  maxDistance: number;
  ordenarCercanos: boolean = false;

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
    private order: OrderByService,
    public geolocationService: GeolocationService,
    public userService: UserService,
    public orderByService: OrderByService
  ) {
    this.headerNavbarService.showHeader = true;
    this.geolocationService.getCurrentPosition();
  }

  onOrderByChange(event: any) {
    // Update selectedOrderBy when the user makes a selection
    this.selectedOrderBy = event.target.value;
  }

  lat: number = 0;
  lng: number = 0;

  async getGeoLocation() {
    this.geolocationService.getCurrentPosition().subscribe({
      next: (position) => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.userService.currentLocation = {
          latitude: this.lat,
          longitude: this.lng,
        };
      },
      error: (error) => {
        console.error('Error getting geolocation:', error);
        if (this.userService.connected) {
          const coord = JSON.parse(this.userService.user.location);
          this.userService.currentLocation = {
            latitude: coord.latitude,
            longitude: coord.longitude,
          };
        } else {
          this.userService.currentLocation = { latitude: 0, longitude: 0 };
        }
      },
    });
  }

  ngOnInit(): void {
    this.getGeoLocation();

    this.maxDistance = this.filtersService.maxDistance;
    this.route.queryParams.subscribe((params) => {
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
        if (orderBy === 'provider') {
          this.ordenarCercanos = true;
        } else {
          this.ordenarCercanos = false;
        }
        this.filtersService
          .getResults(
            searchTerm,
            ratingFilter,
            minPrice,
            maxPrice,
            categories,
            otherValues,
            orderBy
          )
          .subscribe((results) => {
            this.results = results;
            //distancia
            for (let r of results) {
              const distance = this.geolocationService.calcDistance(
                JSON.parse(r.address),
                this.userService.currentLocation
              );
              r.distance = distance;
            }
            if (results.length != 0) {
              if (this.maxDistance && this.maxDistance != 0) {
                this.results = results.filter(
                  (r) => r.distance <= this.maxDistance
                );
              }

              if (this.ordenarCercanos) {
                this.results.sort((a, b) => a.distance - b.distance);
              }
            } else if (results.length === 0) {
              this.snackBar.open(
                'No se han encontrado resultados que coincidan con tu busqueda.',
                'Cerrar',
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
    if (orderBy === 'provider') {
      this.ordenarCercanos = true;
    } else {
      this.ordenarCercanos = false;

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
          this.results = results;
          this.isReordering = false;
        });
    }
  }

  openDialog() {
    this.ordenarCercanos = false;
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
