import { TestBed } from '@angular/core/testing';

import { HeaderNavbarService } from './header-navbar.service';

describe('HeaderNavbarService', () => {
  let business: HeaderNavbarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    business = TestBed.inject(HeaderNavbarService);
  });

  it('should be created', () => {
    expect(business).toBeTruthy();
  });
});
