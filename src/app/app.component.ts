import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'store/reducers';
import { suggestionActions } from "store/actions/suggestions.action";
import * as fromSuggestions from 'store/reducers/suggestions.reducers';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.store.dispatch(suggestionActions.FetchSuggestionsStart({ query: { _filter: fromSuggestions.FILTER.BY_ALL, _sort: fromSuggestions.SORT.MOST_UPVOTES } }))
  }
}
