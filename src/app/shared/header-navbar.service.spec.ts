import { TestBed } from '@angular/core/testing';

import { HeaderNavbarService } from './header-navbar.service';

describe('HeaderNavbarService', () => {
  let service: HeaderNavbarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeaderNavbarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
