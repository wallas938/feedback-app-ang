/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromSuggestions from 'store/reducers/suggestions.reducers';
import * as fromUser from 'store/reducers/user.reducers';
import { SuggestionActions } from "store/actions/suggestions.action";
import { suggestionSelectors } from 'store/selectors/suggestion.selectors';
import * as fromUserActions from "store/actions/user.actions";
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
  suggestionsSubscription: Subscription;
  currentUser: fromUser.User;
  loadingState: Observable<boolean>;
  upvotedSuggestions: Observable<number[]>;
  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.store.select('user').subscribe((state: fromUser.State) => {
      this.currentUser = state.currentUser;
      if (!this.currentUser) {
        this.store.dispatch(new fromUserActions.FetchUserSucceeded(Math.floor(Math.random() * 11) + 1))
      }
    });

    this.suggestionsSubscription = this.store.select(suggestionSelectors.getSuggestions).subscribe((suggestions: fromSuggestions.Suggestion[]) => {
      this.suggestions = suggestions;
      if (!suggestions || suggestions.length <= 0) {
        this.store.dispatch(SuggestionActions.FetchSuggestionsStart({ query: { _filter: fromSuggestions.FILTER.BY_ALL, _sort: fromSuggestions.SORT.MOST_UPVOTES } }))
      }
    });

    this.loadingState = this.store.select(suggestionSelectors.getLoadingState);
    this.upvotedSuggestions = this.store.select(suggestionSelectors.getSuggestionsUpvoted);
  }

  ngOnDestroy(): void {
    this.suggestionsSubscription.unsubscribe();
  }
}
