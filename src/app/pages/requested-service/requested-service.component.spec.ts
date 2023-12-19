import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestedBusinessComponent } from './requested-business.component';

describe('RequestedBusinessComponent', () => {
  let component: RequestedBusinessComponent;
  let fixture: ComponentFixture<RequestedBusinessComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RequestedBusinessComponent]
    });
    fixture = TestBed.createComponent(RequestedBusinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
