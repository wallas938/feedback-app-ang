import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestionsFilterComponent } from './suggestions-filter.component';

describe('SuggestionsFilterComponent', () => {
  let component: SuggestionsFilterComponent;
  let fixture: ComponentFixture<SuggestionsFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuggestionsFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuggestionsFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
