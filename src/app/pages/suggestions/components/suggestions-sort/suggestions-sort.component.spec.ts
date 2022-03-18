import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SuggestionsSortComponent } from './suggestions-sort.component';


describe('SuggestionsSortComponent', () => {
  let component: SuggestionsSortComponent;
  let fixture: ComponentFixture<SuggestionsSortComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuggestionsSortComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuggestionsSortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
