import { SuggestionService } from "@/app/pages/suggestions/services/suggestion.service";
import { HttpErrorResponse } from "@angular/common/http";
import { Injectable, OnDestroy } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { catchError, map, of, Subscription, switchMap, tap } from "rxjs";

import { SuggestionActions } from "store/actions/suggestions.action";
import { suggestionSelectors } from 'store/selectors/suggestion.selectors';
import * as fromRouterActions from "store/actions/router.actions";
import * as fromApp from "store/reducers/index";
import * as fromSuggestions from "store/reducers/suggestions.reducers";

@Injectable()
export class SuggestionEffects implements OnDestroy {
  _filterBy: fromSuggestions.FILTER;
  _sortBy: fromSuggestions.SORT;

  _filterBySubscription: Subscription;
  _sortBySubscription: Subscription;

  constructor(private actions$: Actions,
    private suggestionService: SuggestionService,
    private store: Store<fromApp.AppState>) { }
  ngOnDestroy(): void {
    this._filterBySubscription.unsubscribe();
    this._sortBySubscription.unsubscribe();
  }

  fetchSuggestionsEffect$ = createEffect(
    () => this.actions$.pipe(
      ofType(SuggestionActions.FetchSuggestionsStart),
      switchMap(({ query }) => this.suggestionService.fetchSuggestions({ _filter: query._filter, _sort: query._sort }).pipe(
        map((suggestions: fromSuggestions.Suggestion[]) => SuggestionActions.FetchSuggestionsSucceeded({ suggestions: suggestions })),
        catchError((error) => of((SuggestionActions.FetchSuggestionsFailed(error))))))));

  fetchOneSuggestionEffect$ = createEffect(
    () => this.actions$.pipe(
      ofType(SuggestionActions.FetchOneSuggestionStart),
      switchMap(({ suggestionId }) => {
        return this.suggestionService.fetchSuggestion(suggestionId).pipe(
          map((suggestion: fromSuggestions.Suggestion) => {
            return SuggestionActions.FetchOneSuggestionSucceeded({ suggestion: suggestion })
          }),
          catchError((error) => of(SuggestionActions.FetchOneSuggestionFailed(error))))
      }
      )));

  postOneSuggestion$ = createEffect(
    () => this.actions$.pipe(
      ofType(SuggestionActions.PostOneSuggestionStart),
      switchMap(({ suggestion }) => this.suggestionService.postOneSuggestion(suggestion)
        .pipe(map((newSuggestion: fromSuggestions.Suggestion) => {
          const redirectTo = `feedbacks/${newSuggestion.id}`
          this.store.dispatch(SuggestionActions.PostOneSuggestionSucceeded({ newSuggestion: newSuggestion }));
          this.store.dispatch(new fromRouterActions.RedirectTo(true, redirectTo));
        }),
          switchMap(() => of(SuggestionActions.FetchSuggestionsStart({ query: { _filter: this._filterBy, _sort: this._sortBy } }))),
          catchError((error) => of(SuggestionActions.PostOneSuggestionFailed(error)))))));

  updateOneSuggestion$ = createEffect(
    () => this.actions$.pipe(
      ofType(SuggestionActions.UpdateOneSuggestionStart),
      switchMap(({ updatedSuggestion, suggestionId }) => this.suggestionService.updateOneSuggestion(updatedSuggestion, suggestionId)
        .pipe(map((updatedSuggestion: fromSuggestions.Suggestion) => {
          const redirectTo = `feedbacks/${updatedSuggestion.id}`;
          this.store.dispatch(SuggestionActions.UpdateOneSuggestionSucceeded({ updatedSuggestion: updatedSuggestion }));
          this.store.dispatch(new fromRouterActions.RedirectTo(true, redirectTo));
        }),
          switchMap(() => of(SuggestionActions.FetchSuggestionsStart({ query: { _filter: this._filterBy, _sort: this._sortBy } }))),
          catchError((error) => of(SuggestionActions.UpdateOneSuggestionFailed(error)))))));

  removeOneSuggestion$ = createEffect(
    () => this.actions$.pipe(
      ofType(SuggestionActions.RemoveOneSuggestionStart),
      switchMap(({ suggestionId }) => this.suggestionService.deleteOneSuggestion(suggestionId)
        .pipe(map(() => {
          const redirectTo = `suggestions`;
          this.store.dispatch(SuggestionActions.RemoveOneSuggestionSucceeded());
          this.store.dispatch(new fromRouterActions.RedirectTo(true, redirectTo));
        }),
          switchMap(() => of(SuggestionActions.FetchSuggestionsStart({ query: { _filter: this._filterBy, _sort: this._sortBy } }))),
          catchError((error) => of(SuggestionActions.RemoveOneSuggestionFailed(error)))))));

  incrementUpvotesEffect$ = createEffect(
    () => this.actions$.pipe(
      ofType(SuggestionActions.IncrementUpvotesStart),
      tap(() => {
        this.store.select(suggestionSelectors.getSortByValue).subscribe((sortByValue: fromSuggestions.SORT) => {
          this._sortBy = sortByValue;
        });
        this.store.select(suggestionSelectors.getFilterByValue).subscribe((filterByValue: fromSuggestions.FILTER) => {
          this._filterBy = filterByValue;
        });
      }),
      switchMap(({ suggestion }) =>
        this.suggestionService.incrementSuggestionUpvotes(suggestion)
          .pipe(
            map((suggestionUpdated: fromSuggestions.Suggestion) => {
              this.store.dispatch(SuggestionActions.IncrementUpvotesSucceeded({ suggestionUpdated: suggestionUpdated }));
              return suggestionUpdated;
            }),
            switchMap(() => of(SuggestionActions.FetchSuggestionsStart({ query: { _filter: this._filterBy, _sort: this._sortBy } }))),
            catchError((error: HttpErrorResponse) => of(SuggestionActions.IncrementUpvotesFailed(error))))
      )
    ));

  decrementUpvotesEffect$ = createEffect(
    () => this.actions$.pipe(
      ofType(SuggestionActions.DecrementUpvotesStart),
      tap(() => {
        this.store.select(suggestionSelectors.getSortByValue).subscribe((sortByValue: fromSuggestions.SORT) => {
          this._sortBy = sortByValue;
        });
        this.store.select(suggestionSelectors.getFilterByValue).subscribe((filterByValue: fromSuggestions.FILTER) => {
          this._filterBy = filterByValue;
        });
      }),
      switchMap(({ suggestion }) =>
        this.suggestionService.decrementSuggestionUpvotes(suggestion)
          .pipe(
            map((suggestionUpdated: fromSuggestions.Suggestion) => {
              this.store.dispatch(SuggestionActions.DecrementUpvotesSucceeded({ suggestionUpdated: suggestionUpdated }));
              return suggestionUpdated;
            }),
            switchMap(() => of(SuggestionActions.FetchSuggestionsStart({ query: { _filter: this._filterBy, _sort: this._sortBy } }))),
            catchError((error: HttpErrorResponse) => of(SuggestionActions.IncrementUpvotesFailed(error))))
      )
    ));

  incrementNumberOfCommentsEffect$ = createEffect(
    () => this.actions$.pipe(
      ofType(SuggestionActions.IncrementNumberOfCommentsStart),
      switchMap(({ suggestion }) =>
        this.suggestionService.incrementSuggestionNumberOfComments(suggestion)
          .pipe(
            map((suggestionUpdated: fromSuggestions.Suggestion) => {
              this.store.dispatch(SuggestionActions.PostOneSuggestionSucceeded({ newSuggestion: suggestionUpdated }));
              return suggestionUpdated;
            }),
            switchMap(() => of(SuggestionActions.FetchSuggestionsStart({ query: { _filter: this._filterBy, _sort: this._sortBy } }))),
            catchError((error: HttpErrorResponse) => of(SuggestionActions.IncrementNumberOfCommentsFailed(error))))
      )
    ));
}
