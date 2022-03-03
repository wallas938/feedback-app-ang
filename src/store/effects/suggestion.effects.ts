import { SuggestionService } from "@/app/pages/suggestions/services/suggestion.service";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { catchError, exhaustMap, map, of, switchMap } from "rxjs";

import * as fromSuggestionActions from "store/actions/suggestions.action";
import * as fromSuggestions from "store/reducers/suggestions.reducers";

@Injectable()
export class SuggestionEffects {


  constructor(private actions$: Actions,
    private suggestionService: SuggestionService,
    private store: Store<fromSuggestions.State>) { }

  fetchSuggestionsEffect$ = createEffect(
    () => this.actions$.pipe(
      ofType(fromSuggestionActions.FETCHING_SUGGESTIONS_START),
      switchMap((data: any) => {
        return this.suggestionService.fetchSuggestions({_filter: data.query._filter, _sort: data.query._sort}).pipe(
          map((suggestions: fromSuggestions.Suggestion[]) => new fromSuggestionActions.FetchSuggestionsSucceeded(suggestions)),
          catchError((error) => {
            this.store.dispatch(new fromSuggestionActions.FetchSuggestionsFailed(error))
            return of(error);
          }))
      }
      )
    )
  );

  fetchOneSuggestionEffect$ = createEffect(
    () => this.actions$.pipe(
      ofType(fromSuggestionActions.FETCHING_ONE_SUGGESTION_START),
      switchMap((suggestionData: fromSuggestionActions.FetchOneSuggestionStart) =>
        this.suggestionService.fetchSuggestion(suggestionData.payload).pipe(
          map((suggestion: fromSuggestions.Suggestion) => new fromSuggestionActions.FetchOneSuggestionSucceeded(suggestion)),
          catchError((error) => of(error))))
    )
  );
}
