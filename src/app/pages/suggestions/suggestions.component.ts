/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromSuggestions from 'store/reducers/suggestions.reducers';
import * as SuggestionActions from "store/actions/suggestions.action";
import * as fromApp from 'store/reducers';
import * as fadeAnimations from '@shared/animations/fade';

@Component({
  selector: 'app-suggestions',
  templateUrl: './suggestions.component.html',
  styleUrls: ['./suggestions.component.scss'],
  animations: [fadeAnimations.fadeInOutX,
  fadeAnimations.fadeInOutY
  ]
})
export class SuggestionsComponent implements OnInit {
  suggestions: fromSuggestions.Suggestion[] = [];
  loadingState = false;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {

    this.store.select('suggestions').subscribe((state: fromSuggestions.State) => {
      this.suggestions = state.suggestions;
      this.loadingState = state.loadingState;
      if (!state.filterBy) {
        this.store.dispatch(new SuggestionActions.FetchSuggestionsStart(fromSuggestions.FILTER.MOST_UPVOTES))
      }
    });
  }
}
