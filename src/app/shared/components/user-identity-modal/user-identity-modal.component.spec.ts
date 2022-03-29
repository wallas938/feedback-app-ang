import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserIdentityModalComponent } from './user-identity-modal.component';

describe('UserIdentityModalComponent', () => {
  let component: UserIdentityModalComponent;
  let fixture: ComponentFixture<UserIdentityModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserIdentityModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserIdentityModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
