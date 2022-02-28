/* eslint-disable @typescript-eslint/no-empty-function */
import { Action } from "@ngrx/store";
import { Suggestion } from "store/reducers/suggestions.reducers";

export const FETCHING_SUGGESTIONS_START = '[Suggestions]  FETCHING_SUGGESTIONS_START';
export const FETCHING_SUGGESTIONS_SUCCEEDED = '[Suggestions]  FETCHING_SUGGESTIONS_SUCCEEDED';
export const FETCHING_SUGGESTIONS_FAILED = '[Suggestions]  FETCHING_SUGGESTIONS_FAILED';

export const POST_SUGGESTION = '[Suggestions] Post Suggestions';

export class FetchSuggestionsStart implements Action {
  readonly type = FETCHING_SUGGESTIONS_START;
}

export class FetchSuggestionsSucceeded implements Action {
  readonly type = FETCHING_SUGGESTIONS_SUCCEEDED;
  payload: Suggestion[];
  constructor(payload: Suggestion[]) {
    this.payload = payload
  }
}

export class FetchSuggestionsFailed implements Action {
  readonly type = FETCHING_SUGGESTIONS_FAILED;
}

/* export class PostSuggestion implements Action {
  readonly type = POST_SUGGESTION;
  payload: Suggestion;

  constructor(payload: Suggestion) {
    this.payload = payload
  }
} */

export type SuggestionActionsTypes = FetchSuggestionsStart | FetchSuggestionsSucceeded | FetchSuggestionsFailed;


