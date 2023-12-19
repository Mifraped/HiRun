import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';

describe('UserService', () => {
  let business: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    business = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(business).toBeTruthy();
  });
});
