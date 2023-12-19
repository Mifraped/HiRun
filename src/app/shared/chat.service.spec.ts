import { TestBed } from '@angular/core/testing';

import { ChatService } from './chat.service';

describe('ChatService', () => {
  let business: ChatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    business = TestBed.inject(ChatService);
  });

  it('should be created', () => {
    expect(business).toBeTruthy();
  });
});
