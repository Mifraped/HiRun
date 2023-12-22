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
    'Música',
    'Informática',
    'Pelúquería',
    'Estética',
    'Maquillaje',
    'Fontanería',
  ];
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private filtersService: FiltersService
  ) {}
  @ViewChild('priceRange', { static: true }) priceRange: ElementRef;
  sliderValues: number[] = [20, 80];

  ngOnInit() {
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

    // Listen for the 'update' event
    slider.on('update', (values, handle) => {
      // Convert the slider values to numbers
      const minPrice = Number(values[0]);
      const maxPrice = Number(values[1]);

      // Update minPrice and maxPrice in the FiltersService
      this.filtersService.minPrice = minPrice;
      this.filtersService.maxPrice = maxPrice;

      // Get searchTerm and rating from the FiltersService
      const searchTerm = this.filtersService.searchTerm;
      const rating = this.filtersService.rating;

      // Now you can use searchTerm, rating, minPrice, and maxPrice to filter your results
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
    const categories = this.form.value.categories;

    let selectedCategoryName; // Declare selectedCategoryName here
    const selectedCategoryIndex = categories.findIndex((category) => category);

    if (selectedCategoryIndex !== -1) {
      selectedCategoryName = this.categories[selectedCategoryIndex]; // Assign value here
    }

    this.filtersService
      .getResults(searchTerm, ratingFilter, minPrice, maxPrice, null)
      .subscribe((results) => {
        this.results = results;
        let queryParams = {
          searchTerm: searchTerm,
          rating: ratingFilter,
          minPrice: minPrice,
          maxPrice: maxPrice,
          category: selectedCategoryName,
        }; // include searchTerm, minPrice, and maxPrice in the query parameters
        this.router.navigate(['/results'], { queryParams: queryParams });
      });
  }
}
