import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeframeModalComponent } from './timeframe-modal.component';

describe('TimeframeModalComponent', () => {
  let component: TimeframeModalComponent;
  let fixture: ComponentFixture<TimeframeModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TimeframeModalComponent]
    });
    fixture = TestBed.createComponent(TimeframeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
