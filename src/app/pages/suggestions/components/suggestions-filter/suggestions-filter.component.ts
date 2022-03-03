/* eslint-disable @typescript-eslint/no-empty-function */
import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromSuggestions from 'store/reducers/suggestions.reducers';
import * as fromSuggestionsActions from 'store/actions/suggestions.action';
import * as fromApp from 'store/reducers/index';
import { Router } from '@angular/router';

@Component({
  selector: 'app-suggestions-filter',
  templateUrl: './suggestions-filter.component.html',
  styleUrls: ['./suggestions-filter.component.scss'],
  animations: [
    trigger('dropdown', [
      transition('void => *', [
        animate(400, keyframes([
          style({
            transform: 'translateY(-20px)',
            opacity: 0
          }),
          style({
            transform: 'translateY(0px)',
            opacity: 1
          }),
        ]))
      ]),
      transition('* => void', [
        animate(300, keyframes([
          style({
            transform: 'translateY(0px)',
            opacity: 1
          }),
          style({
            transform: 'translateY(-20px)',
            opacity: 0
          }),
        ]))
      ]),
    ]),
    trigger('rotate', [
      state('arrowDown', style({
        transform: 'rotateZ(0deg)'
      })),
      state('arrowUp', style({
        transform: 'rotateZ(180deg)'
      })),
      transition('arrowDown <=> arrowUp', animate(300))
    ])
  ]
})
export class SuggestionsFilterComponent implements OnInit {
  suggestionsCount: number;
  showFilter = false;
  arrowState = 'arrowDown';
  currentFilter: fromSuggestions.FILTER;
  constructor(private store: Store<fromApp.AppState>, private router: Router) { }

  ngOnInit(): void {
    this.store.select('suggestions').subscribe(
      (state: fromSuggestions.State) => {
        this.suggestionsCount = state.suggestions.length;
        this.currentFilter = state.filterBy
      })
  }

  onToggleFilter() {
    this.showFilter = !this.showFilter;
    switch (this.arrowState) {
      case 'arrowDown':
        this.arrowState = 'arrowUp';
        break;
      case 'arrowUp':
        this.arrowState = 'arrowDown';
        break;

      default:
        this.arrowState = 'arrowDown';
        break;
    }
  }

  onSelectFilter(filter: string) {
    switch (filter) {
      case fromSuggestions.FILTER.MOST_UPVOTES:
        this.currentFilter = fromSuggestions.FILTER.MOST_UPVOTES;
        this.store.dispatch(new fromSuggestionsActions.FetchSuggestionsStart(fromSuggestions.FILTER.MOST_UPVOTES));
        this.onToggleFilter();
        break;
      case fromSuggestions.FILTER.LEAST_UPVOTES:
        this.currentFilter = fromSuggestions.FILTER.LEAST_UPVOTES;
        this.store.dispatch(new fromSuggestionsActions.FetchSuggestionsStart(fromSuggestions.FILTER.LEAST_UPVOTES));
        this.onToggleFilter();
        break;
      case fromSuggestions.FILTER.MOST_COMMENTS:
        this.currentFilter = fromSuggestions.FILTER.MOST_COMMENTS;
        this.store.dispatch(new fromSuggestionsActions.FetchSuggestionsStart(fromSuggestions.FILTER.MOST_COMMENTS));
        this.onToggleFilter();
        break;
      case fromSuggestions.FILTER.LEAST_COMMENTS:
        this.currentFilter = fromSuggestions.FILTER.LEAST_COMMENTS;
        this.store.dispatch(new fromSuggestionsActions.FetchSuggestionsStart(fromSuggestions.FILTER.LEAST_COMMENTS));
        this.onToggleFilter();
        break;
      default:
        this.currentFilter = fromSuggestions.FILTER.MOST_COMMENTS;
        this.store.dispatch(new fromSuggestionsActions.FetchSuggestionsStart(fromSuggestions.FILTER.MOST_UPVOTES));
        this.onToggleFilter();
        break;
    }
  }

  navigateTo() {
    this.store.dispatch(new fromSuggestionsActions.FormAddingMode());
    this.router.navigate(['/feedbacks/new-feedback']);
  }

}
