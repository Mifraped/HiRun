import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-order-by',
  templateUrl: './order-by.component.html',
  styleUrls: ['./order-by.component.css'],
})
export class OrderByComponent {
  form: FormGroup;
  categories = ['Mejores Valorados', 'Más baratos', 'Cercanos', 'Recientes'];
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      categories: this.fb.array([]),
    });

    this.categories.forEach(() => {
      const control = this.fb.control(false);
      (this.form.controls.categories as FormArray).push(control);
    });
  }

  onSelect(index: number) {
    const categoriesArray = this.form.controls.categories as FormArray;
    categoriesArray.controls.forEach((control) => control.setValue(false));
    categoriesArray.controls[index].setValue(true);
  }
}
