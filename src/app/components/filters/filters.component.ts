import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  ViewEncapsulation,
} from '@angular/core';
import noUiSlider from 'nouislider';
import wNumb from 'wnumb';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FiltersService } from 'src/app/shared/filters.service';
import { HeaderNavbarService } from 'src/app/shared/header-navbar.service';


@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class FiltersComponent implements OnInit {
  results: any[];
  filtersForm = this.fb.group({
    rating: [''],
  });

  form: FormGroup;
  categories = [
    'Category 1',
    'Category 2',
    'Category 3',
    'Category 4',
    'Category 5',
    'Category 6',
  ];
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private filtersService: FiltersService,
    public headerNavbarService: HeaderNavbarService,
  ) {
    this.headerNavbarService.showNavbar=false
  }
  @ViewChild('priceRange', { static: true }) priceRange: ElementRef;
  sliderValues: number[] = [20, 80];

  ngOnInit() {
    this.filtersService.minPrice = 0;
    this.filtersService.maxPrice = 100;
    this.form = this.fb.group({
      categories: this.fb.array([]),
    });

    this.results = this.filtersService.searchResults;

    this.categories.forEach(() => {
      const control = this.fb.control(false);
      (this.form.controls.categories as FormArray).push(control);
    });

    this.sliderValues = [10, 100]; // Change these values to your desired start positions

    const slider = noUiSlider.create(this.priceRange.nativeElement, {
      start: this.sliderValues,
      connect: true,
      tooltips: [wNumb({ decimals: 0 }), wNumb({ decimals: 0 })],
      range: {
        min: 0,
        max: 100,
      },
    });

    slider.on('update', (values, handle) => {
      const minPrice = Number(values[0]);
      const maxPrice = Number(values[1]);

      this.filtersService.minPrice = minPrice;
      this.filtersService.maxPrice = maxPrice;

      const searchTerm = this.filtersService.searchTerm;
      const rating = this.filtersService.rating;

      this.filtersService
        .getResults(searchTerm, Number(rating), minPrice, maxPrice, null)
        .subscribe((results) => {
          this.results = results;
        });
    });
  }

  selectCategory(index: number) {
    const control = (this.form.controls.categories as FormArray).at(index);
    control.setValue(!control.value);
  }

  getClass(url: string) {
    return this.router.url.includes(url) ? 'first-other' : 'hola';
  }

  applyFilters() {
    const ratingFilter = Number(this.filtersForm.get('rating').value);
    const searchTerm = this.filtersService.getCurrentSearchTerm();
    const minPrice = this.filtersService.minPrice;
    const maxPrice = this.filtersService.maxPrice;

    this.filtersService
      .getResults(searchTerm, ratingFilter, minPrice, maxPrice, null)
      .subscribe((results) => {
        this.results = results;
        let queryParams = {
          searchTerm: searchTerm,
          minPrice: minPrice,
          maxPrice: maxPrice,
          rating: ratingFilter,
        };

        console.log('searchTerm:', searchTerm);
        console.log('minPrice:', minPrice);
        console.log('maxPrice:', maxPrice);
        console.log('ratingFilter:', ratingFilter);

        this.router.navigate(['/results'], { queryParams: queryParams });
      });
  }
}
