import { SuggestionService } from "@/app/pages/suggestions/services/suggestion.service";
import { HttpErrorResponse } from "@angular/common/http";
import { Injectable, OnDestroy } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { catchError, map, of, Subscription, switchMap, tap } from "rxjs";

import { suggestionActions } from "store/actions/suggestions.action";
import { suggestionSelectors } from 'store/selectors/suggestion.selectors';
import { routerActions } from "store/actions/router.actions";
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
      ofType(suggestionActions.FetchSuggestionsStart),
      switchMap(({ query }) => this.suggestionService.fetchSuggestions({ _filter: query._filter, _sort: query._sort }).pipe(
        map((suggestions: fromSuggestions.Suggestion[]) => suggestionActions.FetchSuggestionsSucceeded({ suggestions: suggestions })),
        catchError((error) => of((suggestionActions.FetchSuggestionsFailed(error))))))));

  fetchOneSuggestionEffect$ = createEffect(
    () => this.actions$.pipe(
      ofType(suggestionActions.FetchOneSuggestionStart),
      switchMap(({ suggestionId }) => {
        return this.suggestionService.fetchSuggestion(suggestionId).pipe(
          map((suggestion: fromSuggestions.Suggestion) => {
            return suggestionActions.FetchOneSuggestionSucceeded({ suggestion: suggestion })
          }),
          catchError((error) => of(suggestionActions.FetchOneSuggestionFailed(error))))
      }
      )));

  postOneSuggestion$ = createEffect(
    () => this.actions$.pipe(
      ofType(suggestionActions.PostOneSuggestionStart),
      switchMap(({ suggestion }) => this.suggestionService.postOneSuggestion(suggestion)
        .pipe(map((newSuggestion: fromSuggestions.Suggestion) => {
          const redirectTo = `feedbacks/${newSuggestion.id}`
          this.store.dispatch(suggestionActions.PostOneSuggestionSucceeded({ newSuggestion: newSuggestion }));
          this.store.dispatch(routerActions.RedirectTo({ redirectTo: redirectTo, toRedirect: true }));
        }),
          switchMap(() => of(suggestionActions.FetchSuggestionsStart({ query: { _filter: this._filterBy, _sort: this._sortBy } }))),
          catchError((error) => of(suggestionActions.PostOneSuggestionFailed(error)))))));

  updateOneSuggestion$ = createEffect(
    () => this.actions$.pipe(
      ofType(suggestionActions.UpdateOneSuggestionStart),
      switchMap(({ updatedSuggestion, suggestionId }) => this.suggestionService.updateOneSuggestion(updatedSuggestion, suggestionId)
        .pipe(map((updatedSuggestion: fromSuggestions.Suggestion) => {
          const redirectTo = `feedbacks/${updatedSuggestion.id}`;
          this.store.dispatch(suggestionActions.UpdateOneSuggestionSucceeded({ updatedSuggestion: updatedSuggestion }));
          this.store.dispatch(routerActions.RedirectTo({ redirectTo: redirectTo, toRedirect: true }));
        }),
          switchMap(() => of(suggestionActions.FetchSuggestionsStart({ query: { _filter: this._filterBy, _sort: this._sortBy } }))),
          catchError((error) => of(suggestionActions.UpdateOneSuggestionFailed(error)))))));

  removeOneSuggestion$ = createEffect(
    () => this.actions$.pipe(
      ofType(suggestionActions.RemoveOneSuggestionStart),
      switchMap(({ suggestionId }) => this.suggestionService.deleteOneSuggestion(suggestionId)
        .pipe(map(() => {
          const redirectTo = `suggestions`;
          this.store.dispatch(suggestionActions.RemoveOneSuggestionSucceeded());
          this.store.dispatch(routerActions.RedirectTo({ redirectTo: redirectTo, toRedirect: true }));
        }),
          switchMap(() => of(suggestionActions.FetchSuggestionsStart({ query: { _filter: this._filterBy, _sort: this._sortBy } }))),
          catchError((error) => of(suggestionActions.RemoveOneSuggestionFailed(error)))))));

  incrementUpvotesEffect$ = createEffect(
    () => this.actions$.pipe(
      ofType(suggestionActions.IncrementUpvotesStart),
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
              this.store.dispatch(suggestionActions.IncrementUpvotesSucceeded({ suggestionUpdated: suggestionUpdated }));
              return suggestionUpdated;
            }),
            switchMap(() => of(suggestionActions.FetchSuggestionsStart({ query: { _filter: this._filterBy, _sort: this._sortBy } }))),
            catchError((error: HttpErrorResponse) => of(suggestionActions.IncrementUpvotesFailed(error))))
      )
    ));

  decrementUpvotesEffect$ = createEffect(
    () => this.actions$.pipe(
      ofType(suggestionActions.DecrementUpvotesStart),
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
              this.store.dispatch(suggestionActions.DecrementUpvotesSucceeded({ suggestionUpdated: suggestionUpdated }));
              return suggestionUpdated;
            }),
            switchMap(() => of(suggestionActions.FetchSuggestionsStart({ query: { _filter: this._filterBy, _sort: this._sortBy } }))),
            catchError((error: HttpErrorResponse) => of(suggestionActions.IncrementUpvotesFailed(error))))
      )
    ));

  incrementNumberOfCommentsEffect$ = createEffect(
    () => this.actions$.pipe(
      ofType(suggestionActions.IncrementNumberOfCommentsStart),
      switchMap(({ suggestion }) =>
        this.suggestionService.incrementSuggestionNumberOfComments(suggestion)
          .pipe(
            map((suggestionUpdated: fromSuggestions.Suggestion) => {
              this.store.dispatch(suggestionActions.PostOneSuggestionSucceeded({ newSuggestion: suggestionUpdated }));
              return suggestionUpdated;
            }),
            switchMap(() => of(suggestionActions.FetchSuggestionsStart({ query: { _filter: this._filterBy, _sort: this._sortBy } }))),
            catchError((error: HttpErrorResponse) => of(suggestionActions.IncrementNumberOfCommentsFailed(error))))
      )
    ));
}
