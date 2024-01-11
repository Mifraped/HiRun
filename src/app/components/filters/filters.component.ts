import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  ViewEncapsulation, Output, EventEmitter
} from '@angular/core';
import noUiSlider from 'nouislider';
import wNumb from 'wnumb';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FiltersService } from 'src/app/shared/filters.service';
import { ActivatedRoute } from '@angular/router';
import { HeaderNavbarService } from 'src/app/shared/header-navbar.service';
import { FiltersStateService } from 'src/app/shared/filters-state.service';
import { CategoryService } from 'src/app/shared/category.service';
import { ResponseCategory } from 'src/app/models/response-category';
import { Category } from 'src/app/models/category';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class FiltersComponent implements OnInit {
  results: any[];
  filtersForm = this.fb.group({
    rating: [''],
  });

  otherForm: FormGroup;

  form: FormGroup;

  categories:string[]=[]

  maxDistance:number

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private filtersService: FiltersService,
    private route: ActivatedRoute,
    public headerNavbarService: HeaderNavbarService,
    
    private filtersStateService: FiltersStateService,
    private categoryService:CategoryService
  ) {
    this.headerNavbarService.showHeader = false;
    this.headerNavbarService.showNavbar = false;
  }

  @ViewChild('priceRange', { static: true }) priceRange: ElementRef;
  sliderValues: number[] = [0, 100];

  ngOnInit() {
    
    
        for (let cat of this.categoryService.iconCat){
          this.categories.push(cat.displayName)
        }    
    


    this.route.queryParams.subscribe((params) => {
      const category = params['category'];
      if (category) {
        const index = this.categories.findIndex(
          (cat) => cat.toLowerCase() === category.toLowerCase()
        );
        if (index !== -1) {
          this.form.controls.categories.patchValue({ [index]: true });
        }
      }
    });
    // Add a new FormControl for each checkbox
    this.otherForm = this.fb.group({
      'Servicio a domicilio': false,
      'Servicio online': false,
      'Pago en efectivo': false,
      'Pago con tarjeta': false,
      // other form controls...
    });

    this.otherForm.valueChanges.subscribe((values) => {
      const otherValuesArray = Object.keys(values).filter((key) => values[key]);
      this.filtersService.setOptions(otherValuesArray);
    });

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
        .getResults(
          searchTerm,
          Number(rating),
          minPrice,
          maxPrice,
          null,
          null,
          null
        )
        .subscribe((results) => {
          this.results = results;
        });
    });
  }

  selectCategory(index: number) {
    console.log(index)
    const control = (this.form.controls.categories as FormArray).at(index);
    control.setValue(!control.value);
  }

  getClass(url: string) {
    return this.router.url.includes(url) ? 'first-other' : 'hola';
  }

  onOptionsChange(event: any) {
    const otherValuesArray = Object.keys(this.otherForm.value).filter(
      (key) => this.otherForm.value[key]
    );
    this.filtersService.setOptions(
      otherValuesArray.length > 0 ? otherValuesArray : []
    );
  }

  formatTitle(title: string): string {
    return title.charAt(0).toUpperCase() + title.slice(1);
  }

  applyFilters() {
    const otherValues = this.otherForm.value; // Get values from otherForm
    const otherValuesArray = Object.keys(otherValues).filter(
      (key) => otherValues[key]
    );
    const ratingValue = this.filtersForm.get('rating').value;
    const ratingFilter = ratingValue ? Number(ratingValue) : null;
    const searchTerm = this.filtersService.getCurrentSearchTerm();
    const minPrice = this.filtersService.minPrice;
    const maxPrice = this.filtersService.maxPrice;
    const categories = this.form.value.categories;
    const selectedCategories = this.form.value.categories
      .map((selected, index) =>
        selected ? this.categories[index].toLowerCase() : null
      )
      .filter((name) => name !== null);

    this.filtersService
      .getResults(
        searchTerm,
        ratingFilter,
        minPrice,
        maxPrice,
        selectedCategories,
        otherValuesArray,
        null
      )
      .subscribe((results) => {
        this.results = results;
        let queryParams = {
          searchTerm: searchTerm,
          rating: ratingFilter,
          minPrice: minPrice,
          maxPrice: maxPrice,
          categories: selectedCategories.join(','),
          other: otherValuesArray.join(','),
        };

        this.router.navigate(['/results'], {
          queryParams: queryParams,
          queryParamsHandling: 'merge',
        });
      });

console.log(this.maxDistance)
this.filtersService.maxDistance=this.maxDistance
  }
}
