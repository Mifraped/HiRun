import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestedServiceComponent } from './requested-service.component';

describe('RequestedServiceComponent', () => {
  let component: RequestedServiceComponent;
  let fixture: ComponentFixture<RequestedServiceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RequestedServiceComponent]
    });
    fixture = TestBed.createComponent(RequestedServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
