/* eslint-disable @typescript-eslint/no-empty-function */
import { HttpErrorResponse } from "@angular/common/http";
import { Action } from "@ngrx/store";
import * as fromSuggestions from "store/reducers/suggestions.reducers";

/*******
 *
 * IDENTIFIERS
 *
 *******/

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

/* SUGGESTIONS SORTS IDENTIFIERS */

export const SORT_BY_MOST_UPVOTES = '[Suggestions]  SORT_BY_MOST_UPVOTES';
export const SORT_BY_LEAST_UPVOTES = '[Suggestions]  SORT_BY_LEAST_UPVOTES';
export const SORT_BY_MOST_COMMENTS = '[Suggestions]  SORT_BY_MOST_COMMENTS';
export const SORT_BY_LEAST_COMMENTS = '[Suggestions]  SORT_BY_LEAST_COMMENTS';

/* INCREMENT UPVOTES IDENTIFIERS */

export const INCREMENT_UPVOTES_START = '[Suggestions]  INCREMENT_UPVOTES_START';
export const INCREMENT_UPVOTES_SUCCEEDED = '[Suggestions]  INCREMENT_UPVOTES_SUCCEEDED';
export const INCREMENT_UPVOTES_FAILED = '[Suggestions]  INCREMENT_UPVOTES_FAILED';


/* INCREMENT UPVOTES IDENTIFIERS */

export const DECREMENT_UPVOTES_START = '[Suggestions]  DECREMENT_UPVOTES_START';
export const DECREMENT_UPVOTES_SUCCEEDED = '[Suggestions]  DECREMENT_UPVOTES_SUCCEEDED';
export const DECREMENT_UPVOTES_FAILED = '[Suggestions]  DECREMENT_UPVOTES_FAILED';

/* POST ONE SUGGESTION IDENTIFIERS */

export const POST_SUGGESTION_START = '[Suggestions]  POST_SUGGESTION_START';
export const POST_SUGGESTION_SUCCEEDED = '[Suggestions]  POST_SUGGESTION_SUCCEEDED';
export const POST_SUGGESTION_FAILED = '[Suggestions]  POST_SUGGESTION_FAILED';

/*******
 *
 * ACTIONS
 *
 *******/

/* POST SUGGESTION ACTIONS */

export class PostOneSuggestionStart implements Action {
  readonly type = POST_SUGGESTION_START;
  constructor(public suggestion: fromSuggestions.Suggestion) { }
}

export class PostOneSuggestionSucceeded implements Action {
  readonly type = POST_SUGGESTION_SUCCEEDED;
  constructor(public newSuggestion: fromSuggestions.Suggestion) { }
}

export class PostOneSuggestionFailed implements Action {
  readonly type = POST_SUGGESTION_FAILED;
  constructor(public error: HttpErrorResponse) { }
}


/* DECREMENT UPVOTES ACTIONS */

export class DecrementUpvotesStart implements Action {
  readonly type = DECREMENT_UPVOTES_START;
  constructor(public suggestion: fromSuggestions.Suggestion) { }
}

export class DecrementUpvotesSucceeded implements Action {
  readonly type = DECREMENT_UPVOTES_SUCCEEDED;
  constructor(public suggestionUpdated: fromSuggestions.Suggestion) { }
}

export class DecrementUpvotesFailed implements Action {
  readonly type = DECREMENT_UPVOTES_FAILED;
  constructor(public error: HttpErrorResponse) { }
}

/* INCREMENT UPVOTES ACTIONS */

export class IncrementUpvotesStart implements Action {
  readonly type = INCREMENT_UPVOTES_START;
  constructor(public suggestion: fromSuggestions.Suggestion) { }
}

export class IncrementUpvotesSucceeded implements Action {
  readonly type = INCREMENT_UPVOTES_SUCCEEDED;
  constructor(public suggestionUpdated: fromSuggestions.Suggestion) { }
}

export class IncrementUpvotesFailed implements Action {
  readonly type = INCREMENT_UPVOTES_FAILED;
  constructor(public error: HttpErrorResponse) { }
}


/* FETCH SUGGESTIONS ACTIONS */

export class FetchSuggestionsStart implements Action {
  readonly type = FETCHING_SUGGESTIONS_START;
  constructor(public query: fromSuggestions.SuggestionsQuery) { }
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
  constructor(public error: HttpErrorResponse) { }
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
  constructor(public payload: fromSuggestions.Suggestion) { }
}

export class FetchOneSuggestionFailed implements Action {
  readonly type = FETCHING_ONE_SUGGESTION_FAILED;
  constructor(public error: HttpErrorResponse) { }
}

/* SUGGESTION FORM MODE ACTIONS*/

export class FormAddingMode implements Action {
  readonly type = FORM_ADDING_MODE;
}

export class FormEditingMode implements Action {
  readonly type = FORM_EDITING_MODE;
}

/* SUGGESTIONS SORT ACTIONS */

export class SortByMostUpvotes implements Action {
  readonly type = SORT_BY_MOST_UPVOTES;
}

export class SortByLeastUpvotes implements Action {
  readonly type = SORT_BY_LEAST_UPVOTES;
}

export class SortByMostComments implements Action {
  readonly type = SORT_BY_MOST_COMMENTS;
}

export class SortByLeastComments implements Action {
  readonly type = SORT_BY_LEAST_COMMENTS;
}

export type SuggestionActionsTypes =
  FetchSuggestionsStart | FetchSuggestionsSucceeded | FetchSuggestionsFailed |
  FetchOneSuggestionStart | FetchOneSuggestionSucceeded | FetchOneSuggestionFailed |
  FormAddingMode | FormEditingMode | SortByMostUpvotes | SortByLeastUpvotes |
  SortByMostComments | SortByLeastComments | IncrementUpvotesStart |
  IncrementUpvotesSucceeded | IncrementUpvotesFailed | DecrementUpvotesStart |
  DecrementUpvotesSucceeded | DecrementUpvotesFailed | PostOneSuggestionStart |
  PostOneSuggestionSucceeded | PostOneSuggestionFailed;


