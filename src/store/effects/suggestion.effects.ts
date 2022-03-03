import { SuggestionService } from "@/app/pages/suggestions/services/suggestion.service";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { catchError, exhaustMap, map, of, switchMap } from "rxjs";

import * as SuggestionActions from "store/actions/suggestions.action";
import * as fromSuggestions from "store/reducers/suggestions.reducers";

@Injectable()
export class SuggestionEffects {


  constructor(private actions$: Actions,
    private suggestionService: SuggestionService,
    private store: Store<fromSuggestions.State>) { }

  fetchSuggestionsEffect$ = createEffect(
    () => this.actions$.pipe(
      ofType(SuggestionActions.FETCHING_SUGGESTIONS_START),
      exhaustMap((data: any) => this.suggestionService.fetchSuggestions(data.payload).pipe(
        map((suggestions: fromSuggestions.Suggestion[]) => new SuggestionActions.FetchSuggestionsSucceeded(suggestions)),
        catchError((error) => of(error))))
    )
  );

  fetchOneSuggestionEffect$ = createEffect(
    () => this.actions$.pipe(
      ofType(SuggestionActions.FETCHING_ONE_SUGGESTION_START),
      switchMap((suggestionData: SuggestionActions.FetchOneSuggestionStart) =>
        this.suggestionService.fetchSuggestion(suggestionData.payload).pipe(
          map((suggestion: fromSuggestions.Suggestion) => new SuggestionActions.FetchOneSuggestionSucceeded(suggestion)),
          catchError((error) => of(error))))
    )
  );
}
