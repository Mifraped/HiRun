import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessProvidedComponent } from './business-provided.component';

describe('BusinessProvidedComponent', () => {
  let component: BusinessProvidedComponent;
  let fixture: ComponentFixture<BusinessProvidedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BusinessProvidedComponent]
    });
    fixture = TestBed.createComponent(BusinessProvidedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
