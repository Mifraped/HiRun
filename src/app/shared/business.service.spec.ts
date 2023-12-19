import { TestBed } from '@angular/core/testing';

import { BusinessService } from './business.service';

describe('BusinessService', () => {
  let business: BusinessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    business = TestBed.inject(BusinessService);
  });

  it('should be created', () => {
    expect(business).toBeTruthy();
  });
});
