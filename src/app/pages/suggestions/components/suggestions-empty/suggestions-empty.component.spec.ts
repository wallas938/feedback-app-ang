import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestionsEmptyComponent } from './suggestions-empty.component';

describe('SuggestionsEmptyComponent', () => {
  let component: SuggestionsEmptyComponent;
  let fixture: ComponentFixture<SuggestionsEmptyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuggestionsEmptyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuggestionsEmptyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
