import { Injectable } from "@angular/core";
import { ActivatedRoute, ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { Store } from "@ngrx/store";
import { map, Observable, of, switchMap, take } from "rxjs";
import * as fromApp from "store/reducers/index";
import * as SuggestionActions from "store/actions/suggestions.action";
import * as fromSuggestions from 'store/reducers/suggestions.reducers';
import { Actions, ofType } from "@ngrx/effects";

@Injectable({ providedIn: 'root' })
export class FeedbackResolver implements Resolve<fromSuggestions.Suggestion> {

  constructor(private store: Store<fromApp.AppState>, private action$: Actions) { }

  resolve(route: ActivatedRouteSnapshot): Observable<fromSuggestions.Suggestion> {
    this.store.dispatch(new SuggestionActions.FetchOneSuggestionStart(route.paramMap.get('id')));
    /* this.store.select('suggestions').pipe(map((state: fromSuggestions.State) => state.suggestion)); */
    return this.action$.pipe(
      ofType(SuggestionActions.FETCHING_ONE_SUGGESTION_SUCCEEDED),
      take(1)
    )
  }
}
