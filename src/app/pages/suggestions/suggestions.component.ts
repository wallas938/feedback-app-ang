/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromSuggestions from 'store/reducers/suggestions.reducers';
import * as fromUser from 'store/reducers/user.reducers';
import * as fromSuggestionActions from "store/actions/suggestions.action";
import * as fromUserActions from "store/actions/user.actions";
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
  currentUser: fromUser.User;
  loadingState = false;
  upvotedSuggestions: number[];
  constructor(private store: Store<fromApp.AppState>) { }

  /*

    {
      "id": 1,
      "title": "Add tags for solutions",
      "category": "nhancement",
      "upvotes": 131,
      "status": "suggestion",
      "description": "Easier to search for solutions based on a specific stack."
    },

  */

  ngOnInit(): void {
    this.store.select('user').subscribe((state: fromUser.State) => {
      this.currentUser = state.currentUser;
      if (!this.currentUser) {
        this.store.dispatch(new fromUserActions.FetchUserSucceeded(Math.floor(Math.random() * 11) + 1))
      }
    });

    this.store.select('suggestions').subscribe((state: fromSuggestions.State) => {
      this.suggestions = state.suggestions;
      this.loadingState = state.loadingState;
      this.upvotedSuggestions = state.suggestionsUpvoted;
      if (!state.filterBy) {
        this.store.dispatch(new fromSuggestionActions.FetchSuggestionsStart({ _filter: fromSuggestions.FILTER.BY_ALL, _sort: fromSuggestions.SORT.MOST_UPVOTES }))
      }
    });
  }

  isUpvoted(id: number): boolean {
    return this.upvotedSuggestions.includes(id);
  }
}
