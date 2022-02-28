import { SuggestionService } from "@/app/pages/suggestions/services/suggestion.service";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { catchError, exhaustMap, map, of } from "rxjs";

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
      exhaustMap(() => this.suggestionService.fetchSuggestions().pipe(
        map((suggestions: any) => new SuggestionActions.FetchSuggestionsSucceeded(suggestions)),
        catchError((error) => of(error))))
    )
  );
}
