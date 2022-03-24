/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnDestroy, OnInit } from '@angular/core';
import * as fromSuggestions from 'store/reducers/suggestions.reducers';
import * as fromLayoutActions from 'store/actions/layout.action';
import { suggestionSelectors } from 'store/selectors/suggestion.selectors';
import * as fromApp from 'store/reducers/index';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-large-screen-header',
  templateUrl: './large-screen-header.component.html',
  styleUrls: ['./large-screen-header.component.scss']
})
export class LargeScreenHeaderComponent implements OnInit, OnDestroy {

  currentFilterValue: fromSuggestions.FILTER;
  suggestionsSubscription: Subscription;
  suggestions: fromSuggestions.Suggestion[];
  public categories: string[] = ["All", "UI", "UX", "Enhancement", "Bug", "Feature"];

  constructor(private store: Store<fromApp.AppState>, private router: Router) { }

  ngOnInit(): void {
    this.suggestionsSubscription = this.store.select(suggestionSelectors.getSuggestions).subscribe((suggestions: fromSuggestions.Suggestion[]) => {
      this.suggestions = suggestions
    });
  }

  getPlannedSuggestionsCount(): number {
    return this.suggestions.filter((request: fromSuggestions.Suggestion) => request.status === 'planned').length;
  }
  getInProgressSuggestionsCount(): number {
    return this.suggestions.filter((request: fromSuggestions.Suggestion) => request.status === 'in-progress').length;
  }
  getLiveSuggestionsCount(): number {
    return this.suggestions.filter((request: fromSuggestions.Suggestion) => request.status === 'live').length;
  }

  navigateToRoadmap() {
    this.router.navigate(['/roadmap']);
    this.store.dispatch(new fromLayoutActions.FilterModalClosed());
  }

  ngOnDestroy(): void {
    this.suggestionsSubscription.unsubscribe();
  }

}
