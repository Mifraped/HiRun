import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { DialogService } from 'src/app/shared/dialog.service';
import { OrderByService } from 'src/app/shared/order-by.service';
import { EventEmitter, Output } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { FiltersService } from 'src/app/shared/filters.service';

@Component({
  selector: 'app-order-by',
  templateUrl: './order-by.component.html',
  styleUrls: ['./order-by.component.css'],
})
export class OrderByComponent {
  form: FormGroup;
  categories = ['Mejores Valorados', 'Más baratos', 'Cercanos', 'Recientes'];
  selectedOrder: string;
  results: any[] = [];

  private url = 'http://localhost:3000';

  orderMapping = {
    'Mejores Valorados': 'rating',
    'Más baratos': 'price',
    Recientes: 'create_date',
  };

  @Output() orderBySelected = new EventEmitter<string>();

  constructor(
    private fb: FormBuilder,
    private dialogService: DialogService,
    private orderByService: OrderByService,
    private http: HttpClient,
    private filtersService: FiltersService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      categories: this.fb.array([]),
    });

    this.categories.forEach(() => {
      const control = this.fb.control(false);
      (this.form.controls.categories as FormArray).push(control);
    });
  }

  onSelect(category: string) {
    const orderMapping = {
      'Mejores Valorados': 'rating',
      'Más baratos': 'price',
      Recientes: 'create_date',
    };

    // Use the orderMapping object to get the correct order value
    const orderBy = orderMapping[category];

    // Update the selected order by value in the service
    this.orderByService.changeOrderBy(orderBy);
  }

  closeDialog() {
    this.dialogService.closeDialog();
  }
}
