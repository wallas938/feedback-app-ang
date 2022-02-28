/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromSuggestions from 'store/reducers/suggestions.reducers';
import * as SuggestionActions from "store/actions/suggestions.action";
import * as fromApp from 'store/reducers';

@Component({
  selector: 'app-suggestions',
  templateUrl: './suggestions.component.html',
  styleUrls: ['./suggestions.component.scss']
})
export class SuggestionsComponent implements OnInit {
  suggestions: fromSuggestions.Suggestion[] = [];
  loadingState = false;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.store.dispatch(new SuggestionActions.FetchSuggestionsStart())

    this.store.select('suggestions').subscribe((data: fromSuggestions.State) => {
      this.suggestions = data.suggestions;
      this.loadingState = data.loadingState;
    });
  }
}
