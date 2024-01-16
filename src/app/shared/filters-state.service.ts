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
    this.filterState.next(state);

    
  }
}
