/* eslint-disable @typescript-eslint/no-empty-function */
import { Action } from "@ngrx/store";
import * as fromSuggestions from "store/reducers/suggestions.reducers";

/* FETCH SUGGESTIONS IDENTIFIERS */

export const FETCHING_SUGGESTIONS_START = '[Suggestions]  FETCHING_SUGGESTIONS_START';
export const FETCHING_SUGGESTIONS_SUCCEEDED = '[Suggestions]  FETCHING_SUGGESTIONS_SUCCEEDED';
export const FETCHING_SUGGESTIONS_FAILED = '[Suggestions]  FETCHING_SUGGESTIONS_FAILED';

/* FETCH ONE SUGGESTION IDENTIFIERS */

export const FETCHING_ONE_SUGGESTION_START = '[Suggestions]  FETCHING_ONE_SUGGESTION_START';
export const FETCHING_ONE_SUGGESTION_SUCCEEDED = '[Suggestions]  FETCHING_ONE_SUGGESTION_SUCCEEDED';
export const FETCHING_ONE_SUGGESTION_FAILED = '[Suggestions]  FETCHING_ONE_SUGGESTION_FAILED';


/* SUGGESTIONS FORM MODE IDENTIFIERS */

export const FORM_ADDING_MODE = '[Suggestions]  FORM_ADDING_MODE';
export const FORM_EDITING_MODE = '[Suggestions]  FORM_EDITING_MODE';

/* SUGGESTIONS FILTERS IDENTIFIERS */

export const FILTER_BY_MOST_UPVOTES = '[Suggestions]  FILTER_BY_MOST_UPVOTES';
export const FILTER_BY_LEAST_UPVOTES = '[Suggestions]  FILTER_BY_LEAST_UPVOTES';
export const FILTER_BY_MOST_COMMENTS = '[Suggestions]  FILTER_BY_MOST_COMMENTS';
export const FILTER_BY_LEAST_COMMENTS = '[Suggestions]  FILTER_BY_LEAST_COMMENTS';


/* FETCH SUGGESTIONS ACTIONS */

export class FetchSuggestionsStart implements Action {
  readonly type = FETCHING_SUGGESTIONS_START;
  constructor(public payload: fromSuggestions.FILTER) {}
}

export class FetchSuggestionsSucceeded implements Action {
  readonly type = FETCHING_SUGGESTIONS_SUCCEEDED;
  payload: fromSuggestions.Suggestion[];
  constructor(payload: fromSuggestions.Suggestion[]) {
    this.payload = payload
  }
}

export class FetchSuggestionsFailed implements Action {
  readonly type = FETCHING_SUGGESTIONS_FAILED;
}

/* FETCH ONE SUGGESTION ACTIONS */

export class FetchOneSuggestionStart implements Action {
  readonly type = FETCHING_ONE_SUGGESTION_START;
  constructor(public payload: string | null) {
    this.payload = payload
  }
}

export class FetchOneSuggestionSucceeded implements Action {
  readonly type = FETCHING_ONE_SUGGESTION_SUCCEEDED;
  constructor(public payload: fromSuggestions.Suggestion) {}
}

export class FetchOneSuggestionFailed implements Action {
  readonly type = FETCHING_ONE_SUGGESTION_FAILED;
}

/* SUGGESTION FORM MODE ACTIONS*/

export class FormAddingMode implements Action {
  readonly type = FORM_ADDING_MODE;
}

export class FormEditingMode implements Action {
  readonly type = FORM_EDITING_MODE;
}

/* SUGGESTIONS FILTERS ACTIONS */

export class FilterByMostUpvotes implements Action {
  readonly type = FILTER_BY_MOST_UPVOTES;
}

export class FilterByLeastUpvotes implements Action {
  readonly type = FILTER_BY_LEAST_UPVOTES;
}

export class FilterByMostComments implements Action {
  readonly type = FILTER_BY_MOST_COMMENTS;
}

export class FilterByLeastComments implements Action {
  readonly type = FILTER_BY_LEAST_COMMENTS;
}

export type SuggestionActionsTypes =
  FetchSuggestionsStart | FetchSuggestionsSucceeded | FetchSuggestionsFailed |
  FetchOneSuggestionStart | FetchOneSuggestionSucceeded | FetchOneSuggestionFailed |
  FormAddingMode | FormEditingMode | FilterByMostUpvotes | FilterByLeastUpvotes |
  FilterByMostComments | FilterByLeastComments;


