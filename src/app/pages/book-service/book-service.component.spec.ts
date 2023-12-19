import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookBusinessComponent } from './book-business.component';

describe('BookBusinessComponent', () => {
  let component: BookBusinessComponent;
  let fixture: ComponentFixture<BookBusinessComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookBusinessComponent]
    });
    fixture = TestBed.createComponent(BookBusinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
