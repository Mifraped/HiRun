import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class FiltersStateService {
  private filterState = new BehaviorSubject<any>({});

  currentFilterState = this.filterState.asObservable();
  constructor() {}

  changeFilterState(state: any) {
    console.log('Rating value before update:', state.rating);
    this.filterState.next(state);

    console.log('New state:', this.filterState.value);
  }
}
