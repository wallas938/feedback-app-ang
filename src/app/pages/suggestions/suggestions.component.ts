/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromSuggestions from 'store/reducers/suggestions.reducers';
import * as fromUser from 'store/reducers/user.reducers';
import { suggestionActions } from "store/actions/suggestions.action";
import { suggestionSelectors } from 'store/selectors/suggestion.selectors';
import { UserActions } from "store/actions/user.actions";
import { userSelectors } from "store/selectors/user.selectors";
import * as fromApp from 'store/reducers';
import * as fadeAnimations from '@shared/animations/fade';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-suggestions',
  templateUrl: './suggestions.component.html',
  styleUrls: ['./suggestions.component.scss'],
  animations: [fadeAnimations.fadeInOutX,
  fadeAnimations.fadeInOutY
  ]
})
export class SuggestionsComponent implements OnInit, OnDestroy {
  suggestions: fromSuggestions.Suggestion[] = [];
  allSubscriptions = new Subscription();
  currentUser: Observable<fromUser.User>;
  loadingState: Observable<boolean>;
  upvotedSuggestions: Observable<number[]>;
  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.currentUser = this.store.select(userSelectors.getCurrentUser);

    this.allSubscriptions.add(this.store.select(suggestionSelectors.getSuggestions).subscribe((suggestions: fromSuggestions.Suggestion[]) => {
      this.suggestions = suggestions;
      if (!suggestions || suggestions.length <= 0) {
        this.store.dispatch(suggestionActions.FetchSuggestionsStart({ query: { _filter: fromSuggestions.FILTER.BY_ALL, _sort: fromSuggestions.SORT.MOST_UPVOTES } }))
      }
    }));

    this.loadingState = this.store.select(suggestionSelectors.getLoadingState);
    this.upvotedSuggestions = this.store.select(suggestionSelectors.getSuggestionsUpvoted);
  }

  ngOnDestroy(): void {
    this.allSubscriptions.unsubscribe();
  }
}
