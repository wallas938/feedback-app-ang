import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoadmapMobileComponent } from './roadmap-mobile.component';

describe('RoadmapMobileComponent', () => {
  let component: RoadmapMobileComponent;
  let fixture: ComponentFixture<RoadmapMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoadmapMobileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoadmapMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
