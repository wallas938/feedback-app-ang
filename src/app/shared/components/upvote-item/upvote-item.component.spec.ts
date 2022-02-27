import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpvoteItemComponent } from './upvote-item.component';

describe('UpvoteItemComponent', () => {
  let component: UpvoteItemComponent;
  let fixture: ComponentFixture<UpvoteItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpvoteItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpvoteItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
