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
      switchMap(({ query }: fromSuggestionActions.FetchSuggestionsStart) => this.suggestionService.fetchSuggestions({ _filter: query._filter, _sort: query._sort }).pipe(
        map((suggestions: fromSuggestions.Suggestion[]) => new fromSuggestionActions.FetchSuggestionsSucceeded(suggestions)),
        catchError((error) => of((new fromSuggestionActions.FetchSuggestionsFailed(error))))))));

  fetchOneSuggestionEffect$ = createEffect(
    () => this.actions$.pipe(
      ofType(fromSuggestionActions.FETCHING_ONE_SUGGESTION_START),
      switchMap(({ payload: index }: fromSuggestionActions.FetchOneSuggestionStart) => {
        return this.suggestionService.fetchSuggestion(index).pipe(
          map((suggestion: fromSuggestions.Suggestion) => {
            return new fromSuggestionActions.FetchOneSuggestionSucceeded(suggestion)
          }),
          catchError((error) => of(new fromSuggestionActions.FetchOneSuggestionFailed(error))))
      }
      )));

  postOneSuggestion$ = createEffect(
    () => this.actions$.pipe(
      ofType(fromSuggestionActions.POST_SUGGESTION_START),
      switchMap(({ suggestion }: fromSuggestionActions.PostOneSuggestionStart) => this.suggestionService.postOneSuggestion(suggestion)
        .pipe(map((newSuggestion: fromSuggestions.Suggestion) => {
          const redirectTo = `feedbacks/${newSuggestion.id}`
          this.store.dispatch(new fromSuggestionActions.PostOneSuggestionSucceeded(newSuggestion));
          this.store.dispatch(new fromRouterActions.RedirectTo(true, redirectTo));
        }),
          switchMap(() => of(new fromSuggestionActions.FetchSuggestionsStart({ _filter: this._filterBy, _sort: this._sortBy }))),
          catchError((error) => of(new fromSuggestionActions.PostOneSuggestionFailed(error)))))));

  updateOneSuggestion$ = createEffect(
    () => this.actions$.pipe(
      ofType(fromSuggestionActions.UPDATE_SUGGESTION_START),
      switchMap(({ updatedSuggestion, suggestionId }: fromSuggestionActions.UpdateOneSuggestionStart) => this.suggestionService.updateOneSuggestion(updatedSuggestion, suggestionId)
        .pipe(map((updatedSuggestion: fromSuggestions.Suggestion) => {
          const redirectTo = `feedbacks/${updatedSuggestion.id}`;
          this.store.dispatch(new fromSuggestionActions.UpdateOneSuggestionSucceeded(updatedSuggestion));
          this.store.dispatch(new fromRouterActions.RedirectTo(true, redirectTo));
        }),
          switchMap(() => of(new fromSuggestionActions.FetchSuggestionsStart({ _filter: this._filterBy, _sort: this._sortBy }))),
          catchError((error) => of(new fromSuggestionActions.UpdateOneSuggestionFailed(error)))))));

  removeOneSuggestion$ = createEffect(
    () => this.actions$.pipe(
      ofType(fromSuggestionActions.REMOVE_SUGGESTION_START),
      switchMap(({ suggestionId }: fromSuggestionActions.RemoveOneSuggestionStart) => this.suggestionService.deleteOneSuggestion(suggestionId)
        .pipe(map(() => {
          const redirectTo = `suggestions`;
          this.store.dispatch(new fromSuggestionActions.RemoveOneSuggestionSucceeded());
          this.store.dispatch(new fromRouterActions.RedirectTo(true, redirectTo));
        }),
          switchMap(() => of(new fromSuggestionActions.FetchSuggestionsStart({ _filter: this._filterBy, _sort: this._sortBy }))),
          catchError((error) => of(new fromSuggestionActions.RemoveOneSuggestionFailed(error)))))));

  incrementUpvotesEffect$ = createEffect(
    () => this.actions$.pipe(
      ofType(fromSuggestionActions.INCREMENT_UPVOTES_START),
      tap(() => {
        this.store.select('suggestions').subscribe((state: fromSuggestions.State) => {
          this._filterBy = state.filterBy;
          this._sortBy = state.sortBy;
        })
      }),
      switchMap(({ suggestion }: fromSuggestionActions.IncrementUpvotesStart) =>
        this.suggestionService.incrementSuggestionUpvotes(suggestion)
          .pipe(
            map((update: fromSuggestions.Suggestion) => {
              this.store.dispatch(new fromSuggestionActions.IncrementUpvotesSucceeded(update));
              return update;
            }),
            switchMap(() => of(new fromSuggestionActions.FetchSuggestionsStart({ _filter: this._filterBy, _sort: this._sortBy }))),
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
      switchMap(({ suggestion }: fromSuggestionActions.DecrementUpvotesStart) =>
        this.suggestionService.decrementSuggestionUpvotes(suggestion)
          .pipe(
            map((update: fromSuggestions.Suggestion) => {
              this.store.dispatch(new fromSuggestionActions.DecrementUpvotesSucceeded(update));
              return update;
            }),
            switchMap(() => of(new fromSuggestionActions.FetchSuggestionsStart({ _filter: this._filterBy, _sort: this._sortBy }))),
            catchError((error: HttpErrorResponse) => of(new fromSuggestionActions.IncrementUpvotesFailed(error))))
      )
    ));

  incrementNumberOfCommentsEffect$ = createEffect(
    () => this.actions$.pipe(
      ofType(fromSuggestionActions.INCREMENT_NUMBER_OF_COMMENTS_START),
      switchMap(({ suggestion }: fromSuggestionActions.IncrementNumberOfCommentsStart) =>
        this.suggestionService.incrementSuggestionNumberOfComments(suggestion)
          .pipe(
            map((update: fromSuggestions.Suggestion) => {
              this.store.dispatch(new fromSuggestionActions.PostOneSuggestionSucceeded(update));
              return update;
            }),
            switchMap(() => of(new fromSuggestionActions.FetchSuggestionsStart({ _filter: this._filterBy, _sort: this._sortBy }))),
            catchError((error: HttpErrorResponse) => of(new fromSuggestionActions.IncrementNumberOfCommentsFailed(error))))
      )
    ));
}
