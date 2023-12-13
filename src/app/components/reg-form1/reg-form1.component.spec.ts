import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegForm1Component } from './reg-form1.component';

describe('RegForm1Component', () => {
  let component: RegForm1Component;
  let fixture: ComponentFixture<RegForm1Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegForm1Component]
    });
    fixture = TestBed.createComponent(RegForm1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
