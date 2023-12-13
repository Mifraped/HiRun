import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegForm2Component } from './reg-form2.component';

describe('RegForm2Component', () => {
  let component: RegForm2Component;
  let fixture: ComponentFixture<RegForm2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegForm2Component]
    });
    fixture = TestBed.createComponent(RegForm2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
