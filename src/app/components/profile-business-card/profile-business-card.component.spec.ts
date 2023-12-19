import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileBusinessCardComponent } from './profile-business-card.component';

describe('ProfileBusinessCardComponent', () => {
  let component: ProfileBusinessCardComponent;
  let fixture: ComponentFixture<ProfileBusinessCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileBusinessCardComponent]
    });
    fixture = TestBed.createComponent(ProfileBusinessCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
