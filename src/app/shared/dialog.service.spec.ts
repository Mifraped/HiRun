import { TestBed } from '@angular/core/testing';

import { DialogService } from './dialog.service';

describe('DialogService', () => {
  let business: DialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    business = TestBed.inject(DialogService);
  });

  it('should be created', () => {
    expect(business).toBeTruthy();
  });
});
