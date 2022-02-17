import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LargeScreenHeaderComponent } from './large-screen-header.component';

describe('LargeScreenHeaderComponent', () => {
  let component: LargeScreenHeaderComponent;
  let fixture: ComponentFixture<LargeScreenHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LargeScreenHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LargeScreenHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
