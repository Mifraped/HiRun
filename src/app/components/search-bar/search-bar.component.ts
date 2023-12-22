import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/category';
import { FiltersService } from 'src/app/shared/filters.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
})
export class SearchBarComponent {
  searchTerm: string = '';
  constructor(private router: Router, private filterService: FiltersService) {}

  onSubmit(): void {
    if (this.searchTerm.trim() === '') {
      return;
    }

    const minPrice = this.filterService.minPrice;
    const maxPrice = this.filterService.maxPrice;

    this.filterService
      .getResults(this.searchTerm, null, minPrice, maxPrice, null)
      .subscribe((results) => {
        let queryParams = {
          searchTerm: this.searchTerm,
          minPrice: minPrice,
          maxPrice: maxPrice,
        };
        this.router.navigate(['/results'], { queryParams: queryParams });
      });
  }
}
