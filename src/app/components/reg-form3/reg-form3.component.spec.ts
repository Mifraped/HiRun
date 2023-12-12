import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegForm3Component } from './reg-form3.component';

describe('RegForm3Component', () => {
  let component: RegForm3Component;
  let fixture: ComponentFixture<RegForm3Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegForm3Component]
    });
    fixture = TestBed.createComponent(RegForm3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
