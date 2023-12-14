import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceCardMediumComponent } from './service-card-medium.component';

describe('ServiceCardMediumComponent', () => {
  let component: ServiceCardMediumComponent;
  let fixture: ComponentFixture<ServiceCardMediumComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ServiceCardMediumComponent]
    });
    fixture = TestBed.createComponent(ServiceCardMediumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
