import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileServiceCardComponent } from './profile-service-card.component';

describe('ProfileServiceCardComponent', () => {
  let component: ProfileServiceCardComponent;
  let fixture: ComponentFixture<ProfileServiceCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileServiceCardComponent]
    });
    fixture = TestBed.createComponent(ProfileServiceCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
