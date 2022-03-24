/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromSuggestions from 'store/reducers/suggestions.reducers';
import { suggestionSelectors } from 'store/selectors/suggestion.selectors';
import { SuggestionActions } from 'store/actions/suggestions.action';
import * as fromApp from 'store/reducers';

@Component({
  selector: 'app-category-chips',
  templateUrl: './category-chips.component.html',
  styleUrls: ['./category-chips.component.scss']
})
export class CategoryChipsComponent implements OnInit {

  @Output() setFilter: EventEmitter<string> = new EventEmitter<string>();
  @Input() categoryValue: string;
  selected = false;
  sortBy: fromSuggestions.SORT;
  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.store.select(suggestionSelectors.getSortByValue).subscribe((sortByValue: fromSuggestions.SORT) => {
      this.sortBy = sortByValue;
    });

    this.store.select(suggestionSelectors.getFilterByValue).subscribe((filterByValue: fromSuggestions.FILTER) => {
      this.selected = (!filterByValue && this.categoryValue?.toLowerCase() === "all") && true;
      this.selected = filterByValue?.toLowerCase().includes(this.categoryValue?.toLowerCase()) && true;
    });
  }

  onSetFilter() {
    if (fromSuggestions.FILTER.BY_ALL.toLowerCase().includes(this.categoryValue.toLowerCase())) {
      this.store.dispatch(SuggestionActions.FetchSuggestionsStart({ query: { _filter: fromSuggestions.FILTER.BY_ALL, _sort: this.sortBy } }));
    } else if (fromSuggestions.FILTER.BY_BUG.toLowerCase().includes(this.categoryValue.toLowerCase())) {
      this.store.dispatch(SuggestionActions.FetchSuggestionsStart({ query: { _filter: fromSuggestions.FILTER.BY_BUG, _sort: this.sortBy } }));
    } else if (fromSuggestions.FILTER.BY_ENHANCEMENT.toLowerCase().includes(this.categoryValue.toLowerCase())) {
      this.store.dispatch(SuggestionActions.FetchSuggestionsStart({ query: { _filter: fromSuggestions.FILTER.BY_ENHANCEMENT, _sort: this.sortBy } }));
    } else if (fromSuggestions.FILTER.BY_FEATURE.toLowerCase().includes(this.categoryValue.toLowerCase())) {
      this.store.dispatch(SuggestionActions.FetchSuggestionsStart({ query: { _filter: fromSuggestions.FILTER.BY_FEATURE, _sort: this.sortBy } }));
    } else if (fromSuggestions.FILTER.BY_UI.toLowerCase().includes(this.categoryValue.toLowerCase())) {
      this.store.dispatch(SuggestionActions.FetchSuggestionsStart({ query: { _filter: fromSuggestions.FILTER.BY_UI, _sort: this.sortBy } }));
    } else if (fromSuggestions.FILTER.BY_UX.toLowerCase().includes(this.categoryValue.toLowerCase())) {
      this.store.dispatch(SuggestionActions.FetchSuggestionsStart({ query: { _filter: fromSuggestions.FILTER.BY_UX, _sort: this.sortBy } }));
    } else {
      this.store.dispatch(SuggestionActions.FetchSuggestionsStart({ query: { _filter: fromSuggestions.FILTER.BY_ALL, _sort: this.sortBy } }));
    }
  }
}
