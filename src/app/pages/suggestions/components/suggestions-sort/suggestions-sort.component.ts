/* eslint-disable @typescript-eslint/no-empty-function */
import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromSuggestions from 'store/reducers/suggestions.reducers';
import { suggestionActions } from 'store/actions/suggestions.action';
import { suggestionSelectors } from 'store/selectors/suggestion.selectors';

import { LayoutActions } from 'store/actions/layout.action';
import { layoutSelectors } from "store/selectors/layout.selectors";
import * as fromApp from 'store/reducers/index';
import { Router } from '@angular/router';

@Component({
  selector: 'app-suggestions-sort',
  templateUrl: './suggestions-sort.component.html',
  styleUrls: ['./suggestions-sort.component.scss'],
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
export class SuggestionsSortComponent implements OnInit {
  suggestionsCount: number;
  showSortByModal: boolean;
  arrowState = 'arrowDown';
  currentFilterValue: fromSuggestions.FILTER;
  currentSortValue: fromSuggestions.SORT;

  constructor(private store: Store<fromApp.AppState>,
    private router: Router,
    private renderer: Renderer2) { }

  ngOnInit(): void {
    this.store.select(suggestionSelectors.getSuggestions).subscribe((suggestions: fromSuggestions.Suggestion[]) => {
      this.suggestionsCount = suggestions.length;
    });

    this.store.select(suggestionSelectors.getSortByValue).subscribe((currentSortValue: fromSuggestions.SORT) => {
      this.currentSortValue = currentSortValue;
    });

    this.store.select(suggestionSelectors.getFilterByValue).subscribe((currentFilterValue: fromSuggestions.FILTER) => {
      this.currentFilterValue = currentFilterValue;
    });

    this.store.select(layoutSelectors.getSortModalOpened).subscribe((sortModalOpened: boolean) => {
      this.showSortByModal = sortModalOpened;
    });

    this.store.select(layoutSelectors.getmobileMenuOpened).subscribe((mobileMenuOpened: boolean) => {
      if (mobileMenuOpened) {
        this.arrowState = 'arrowDown';
      }
    });
  }

  onToggleSortModal() {
    if (!this.showSortByModal) {
      this.store.dispatch(LayoutActions.FilterModalOpened())
    } else {
      this.store.dispatch(LayoutActions.FilterModalClosed());
    }
    this.setArrowState();
    this.setBodyScrolling();
  }

  closeMenu() {
    this.store.dispatch(LayoutActions.FilterModalClosed());
    this.setArrowState();
    this.setBodyScrolling();
  }

  setBodyScrolling() {
    this.showSortByModal ?
      this.renderer.addClass(document.body, 'remove-scroll') :
      this.renderer.removeClass(document.body, 'remove-scroll');
  }

  onSelectSort(sortValue: string) {
    switch (sortValue) {
      case fromSuggestions.SORT.MOST_UPVOTES:
        this.currentSortValue = fromSuggestions.SORT.MOST_UPVOTES;
        this.store.dispatch(suggestionActions.FetchSuggestionsStart({ query: { _filter: this.currentFilterValue, _sort: fromSuggestions.SORT.MOST_UPVOTES } }));
        break;
      case fromSuggestions.SORT.LEAST_UPVOTES:
        this.currentSortValue = fromSuggestions.SORT.LEAST_UPVOTES;
        this.store.dispatch(suggestionActions.FetchSuggestionsStart({ query: { _filter: this.currentFilterValue, _sort: fromSuggestions.SORT.LEAST_UPVOTES } }));
        break;
      case fromSuggestions.SORT.MOST_COMMENTS:
        this.currentSortValue = fromSuggestions.SORT.MOST_COMMENTS;
        this.store.dispatch(suggestionActions.FetchSuggestionsStart({ query: { _filter: this.currentFilterValue, _sort: fromSuggestions.SORT.MOST_COMMENTS } }));
        break;
      case fromSuggestions.SORT.LEAST_COMMENTS:
        this.currentSortValue = fromSuggestions.SORT.LEAST_COMMENTS;
        this.store.dispatch(suggestionActions.FetchSuggestionsStart({ query: { _filter: this.currentFilterValue, _sort: fromSuggestions.SORT.LEAST_COMMENTS } }));
        break;
      default:
        this.currentSortValue = fromSuggestions.SORT.MOST_COMMENTS;
        this.store.dispatch(suggestionActions.FetchSuggestionsStart({ query: { _filter: this.currentFilterValue, _sort: fromSuggestions.SORT.MOST_COMMENTS } }));
    }
  }

  navigateTo() {
    this.store.dispatch(suggestionActions.FormAddingMode());
    this.store.dispatch(LayoutActions.FilterModalClosed());
    this.router.navigate(['/feedbacks/new-feedback']);
  }

  private setArrowState() {
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

  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'remove-scroll');
  }
}
