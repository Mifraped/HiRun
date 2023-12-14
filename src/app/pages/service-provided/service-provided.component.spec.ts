import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceProvidedComponent } from './service-provided.component';

describe('ServiceProvidedComponent', () => {
  let component: ServiceProvidedComponent;
  let fixture: ComponentFixture<ServiceProvidedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ServiceProvidedComponent]
    });
    fixture = TestBed.createComponent(ServiceProvidedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
