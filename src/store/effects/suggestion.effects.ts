import { SuggestionService } from "@/app/pages/suggestions/services/suggestion.service";
import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { catchError, map, of, switchMap, tap } from "rxjs";

import * as fromSuggestionActions from "store/actions/suggestions.action";
import * as fromRouterActions from "store/actions/router.actions";
import * as fromApp from "store/reducers/index";
import * as fromSuggestions from "store/reducers/suggestions.reducers";

@Injectable()
export class SuggestionEffects {
  _filterBy: fromSuggestions.FILTER;
  _sortBy: fromSuggestions.SORT;

  constructor(private actions$: Actions,
    private suggestionService: SuggestionService,
    private store: Store<fromApp.AppState>) { }

  fetchSuggestionsEffect$ = createEffect(
    () => this.actions$.pipe(
      ofType(fromSuggestionActions.FETCHING_SUGGESTIONS_START),
      switchMap((data: any) => this.suggestionService.fetchSuggestions({ _filter: data.query._filter, _sort: data.query._sort }).pipe(
        map((suggestions: fromSuggestions.Suggestion[]) => new fromSuggestionActions.FetchSuggestionsSucceeded(suggestions)),
        catchError((error) => of((new fromSuggestionActions.FetchSuggestionsFailed(error))))))));

  fetchOneSuggestionEffect$ = createEffect(
    () => this.actions$.pipe(
      ofType(fromSuggestionActions.FETCHING_ONE_SUGGESTION_START),
      switchMap(({ payload: index }: fromSuggestionActions.FetchOneSuggestionStart) =>
        this.suggestionService.fetchSuggestion(index).pipe(
          map((suggestion: fromSuggestions.Suggestion) => new fromSuggestionActions.FetchOneSuggestionSucceeded(suggestion)),
          catchError((error) => of(new fromSuggestionActions.FetchOneSuggestionFailed(error)))))));

  postOneSuggestion$ = createEffect(
    () => this.actions$.pipe(
      ofType(fromSuggestionActions.POST_SUGGESTION_START),
      switchMap(({ suggestion }: fromSuggestionActions.PostOneSuggestionStart) => this.suggestionService.postOneSuggestion(suggestion)
        .pipe(map((newSuggestion: fromSuggestions.Suggestion) => {
          this.store.dispatch(new fromSuggestionActions.PostOneSuggestionSucceeded(newSuggestion));
          this.store.dispatch(new fromRouterActions.RedirectTo(true, 'feebacks'));
        }),
          switchMap((data: any) => of(new fromSuggestionActions.FetchSuggestionsStart({ _filter: this._filterBy, _sort: this._sortBy }))),
          catchError((error) => of(new fromSuggestionActions.PostOneSuggestionFailed(error)))))));

  incrementUpvotesEffect$ = createEffect(
    () => this.actions$.pipe(
      ofType(fromSuggestionActions.INCREMENT_UPVOTES_START),
      tap(() => {
        this.store.select('suggestions').subscribe((state: fromSuggestions.State) => {
          this._filterBy = state.filterBy;
          this._sortBy = state.sortBy;
        })
      }),
      switchMap((data: any) =>
        this.suggestionService.incrementSuggestionUpvotes(data.suggestion)
          .pipe(
            map((update: fromSuggestions.Suggestion) =>
              this.store.dispatch(new fromSuggestionActions.IncrementUpvotesSucceeded(update))
            ),
            switchMap((data: any) => of(new fromSuggestionActions.FetchSuggestionsStart({ _filter: this._filterBy, _sort: this._sortBy }))),
            catchError((error: HttpErrorResponse) => of(new fromSuggestionActions.IncrementUpvotesFailed(error))))
      )
    ));

  decrementUpvotesEffect$ = createEffect(
    () => this.actions$.pipe(
      ofType(fromSuggestionActions.DECREMENT_UPVOTES_START),
      tap(() => {
        this.store.select('suggestions').subscribe((state: fromSuggestions.State) => {
          this._filterBy = state.filterBy;
          this._sortBy = state.sortBy;
        })
      }),
      switchMap((data: any) =>
        this.suggestionService.decrementSuggestionUpvotes(data.suggestion)
          .pipe(
            map((update: fromSuggestions.Suggestion) =>
              this.store.dispatch(new fromSuggestionActions.DecrementUpvotesSucceeded(update))
            ),
            switchMap((data: any) => of(new fromSuggestionActions.FetchSuggestionsStart({ _filter: this._filterBy, _sort: this._sortBy }))),
            catchError((error: HttpErrorResponse) => of(new fromSuggestionActions.IncrementUpvotesFailed(error))))
      )
    ));
}
