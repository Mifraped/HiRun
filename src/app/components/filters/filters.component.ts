import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  ViewEncapsulation,
} from '@angular/core';
import * as noUiSlider from 'nouislider';
import wNumb from 'wnumb';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class FiltersComponent implements OnInit {
  form: FormGroup;
  categories = [
    'Category 1',
    'Category 2',
    'Category 3',
    'Category 4',
    'Category 5',
    'Category 6',
  ];
  constructor(private fb: FormBuilder, private router: Router) {}
  @ViewChild('priceRange', { static: true }) priceRange: ElementRef;
  sliderValues: number[] = [20, 80];

  ngOnInit() {
    this.form = this.fb.group({
      categories: this.fb.array([]),
    });

    this.categories.forEach(() => {
      const control = this.fb.control(false);
      (this.form.controls.categories as FormArray).push(control);
    });

    const slider = noUiSlider.create(this.priceRange.nativeElement, {
      start: this.sliderValues,
      connect: true,
      tooltips: [wNumb({ decimals: 0 }), wNumb({ decimals: 0 })], // Change this line
      range: {
        min: 0,
        max: 100,
      },
    });
  }

  selectCategory(index: number) {
    const control = (this.form.controls.categories as FormArray).at(index);
    control.setValue(!control.value);
  }

  getClass(url: string) {
    return this.router.url.includes(url) ? 'first-other' : 'hola';
  }
}
