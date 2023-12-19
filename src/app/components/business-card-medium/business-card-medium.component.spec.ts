import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessCardMediumComponent } from './business-card-medium.component';

describe('BusinessCardMediumComponent', () => {
  let component: BusinessCardMediumComponent;
  let fixture: ComponentFixture<BusinessCardMediumComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BusinessCardMediumComponent]
    });
    fixture = TestBed.createComponent(BusinessCardMediumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
