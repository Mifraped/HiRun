import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FiltersService } from 'src/app/shared/filters.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
})
export class SearchBarComponent {
  searchTerm: string;
  constructor(private router: Router, private filterService: FiltersService) {}

  onSubmit(): void {
    this.filterService.getResults(this.searchTerm).subscribe(() => {
      this.router.navigate(['/results'], {
        queryParams: { searchTerm: this.searchTerm },
      });
    });
  }
}
