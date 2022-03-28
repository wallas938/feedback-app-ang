/* eslint-disable @typescript-eslint/no-empty-function */
import { HttpErrorResponse } from "@angular/common/http";
import { createAction, props } from "@ngrx/store";
import * as fromSuggestions from "store/reducers/suggestions.reducers";

/*******
 *
 * IDENTIFIERS
 *
 *******/

/* FETCH SUGGESTIONS IDENTIFIERS */

const FETCHING_SUGGESTIONS_START = '[Suggestions]  FETCHING_SUGGESTIONS_START';
const FETCHING_SUGGESTIONS_SUCCEEDED = '[Suggestions]  FETCHING_SUGGESTIONS_SUCCEEDED';
const FETCHING_SUGGESTIONS_FAILED = '[Suggestions]  FETCHING_SUGGESTIONS_FAILED';

/* FETCH ONE SUGGESTION IDENTIFIERS */

const FETCHING_ONE_SUGGESTION_START = '[Suggestions]  FETCHING_ONE_SUGGESTION_START';
const FETCHING_ONE_SUGGESTION_SUCCEEDED = '[Suggestions]  FETCHING_ONE_SUGGESTION_SUCCEEDED';
const FETCHING_ONE_SUGGESTION_FAILED = '[Suggestions]  FETCHING_ONE_SUGGESTION_FAILED';


/* SUGGESTIONS FORM MODE IDENTIFIERS */

const FORM_ADDING_MODE = '[Suggestions]  FORM_ADDING_MODE';
const FORM_EDITING_MODE = '[Suggestions]  FORM_EDITING_MODE';

/* SUGGESTIONS SORTS IDENTIFIERS */

const SORT_BY_MOST_UPVOTES = '[Suggestions]  SORT_BY_MOST_UPVOTES';
const SORT_BY_LEAST_UPVOTES = '[Suggestions]  SORT_BY_LEAST_UPVOTES';
const SORT_BY_MOST_COMMENTS = '[Suggestions]  SORT_BY_MOST_COMMENTS';
const SORT_BY_LEAST_COMMENTS = '[Suggestions]  SORT_BY_LEAST_COMMENTS';

/* INCREMENT UPVOTES IDENTIFIERS */

const INCREMENT_UPVOTES_START = '[Suggestions]  INCREMENT_UPVOTES_START';
const INCREMENT_UPVOTES_SUCCEEDED = '[Suggestions]  INCREMENT_UPVOTES_SUCCEEDED';
const INCREMENT_UPVOTES_FAILED = '[Suggestions]  INCREMENT_UPVOTES_FAILED';

/* INCREMENT NUMBER_OF_COMMENTS IDENTIFIERS */

const INCREMENT_NUMBER_OF_COMMENTS_START = '[Suggestions]  INCREMENT_NUMBER_OF_COMMENTS_START';
const INCREMENT_NUMBER_OF_COMMENTS_SUCCEEDED = '[Suggestions]  INCREMENT_NUMBER_OF_COMMENTS_SUCCEEDED';
const INCREMENT_NUMBER_OF_COMMENTS_FAILED = '[Suggestions]  INCREMENT_NUMBER_OF_COMMENTS_FAILED';


/* DECREMENT UPVOTES IDENTIFIERS */

const DECREMENT_UPVOTES_START = '[Suggestions]  DECREMENT_UPVOTES_START';
const DECREMENT_UPVOTES_SUCCEEDED = '[Suggestions]  DECREMENT_UPVOTES_SUCCEEDED';
const DECREMENT_UPVOTES_FAILED = '[Suggestions]  DECREMENT_UPVOTES_FAILED';

/* POST ONE SUGGESTION IDENTIFIERS */

const POST_SUGGESTION_START = '[Suggestions]  POST_SUGGESTION_START';
const POST_SUGGESTION_SUCCEEDED = '[Suggestions]  POST_SUGGESTION_SUCCEEDED';
const POST_SUGGESTION_FAILED = '[Suggestions]  POST_SUGGESTION_FAILED';

/* UPDATE ONE SUGGESTION IDENTIFIERS */

const UPDATE_SUGGESTION_START = '[Suggestions]  UPDATE_SUGGESTION_START';
const UPDATE_SUGGESTION_SUCCEEDED = '[Suggestions]  UPDATE_SUGGESTION_SUCCEEDED';
const UPDATE_SUGGESTION_FAILED = '[Suggestions]  UPDATE_SUGGESTION_FAILED';

/* REMOVE ONE SUGGESTION IDENTIFIERS */

const REMOVE_SUGGESTION_START = '[Suggestions]  REMOVE_SUGGESTION_START';
const REMOVE_SUGGESTION_SUCCEEDED = '[Suggestions]  REMOVE_SUGGESTION_SUCCEEDED';
const REMOVE_SUGGESTION_FAILED = '[Suggestions]  REMOVE_SUGGESTION_FAILED';

/*******
 *
 * ACTIONS
 *
 *******/

/* REMOVE SUGGESTION ACTIONS */

const RemoveOneSuggestionStart = createAction(REMOVE_SUGGESTION_START, props<{ suggestionId: number }>());
const RemoveOneSuggestionSucceeded = createAction(REMOVE_SUGGESTION_SUCCEEDED);
const RemoveOneSuggestionFailed = createAction(REMOVE_SUGGESTION_FAILED, props<{ error: HttpErrorResponse }>());


/* POST SUGGESTION ACTIONS */

const UpdateOneSuggestionStart = createAction(UPDATE_SUGGESTION_START, props<{ updatedSuggestion: fromSuggestions.Suggestion, suggestionId: number }>());
const UpdateOneSuggestionSucceeded = createAction(UPDATE_SUGGESTION_SUCCEEDED, props<{ updatedSuggestion: fromSuggestions.Suggestion }>());
const UpdateOneSuggestionFailed = createAction(UPDATE_SUGGESTION_FAILED, props<{ error: HttpErrorResponse }>());


/* POST SUGGESTION ACTIONS */

const PostOneSuggestionStart = createAction(POST_SUGGESTION_START, props<{ suggestion: fromSuggestions.Suggestion }>());
const PostOneSuggestionSucceeded = createAction(POST_SUGGESTION_SUCCEEDED, props<{ newSuggestion: fromSuggestions.Suggestion }>());
const PostOneSuggestionFailed = createAction(POST_SUGGESTION_FAILED, props<{ error: HttpErrorResponse }>());


/* DECREMENT UPVOTES ACTIONS */

const DecrementUpvotesStart = createAction(DECREMENT_UPVOTES_START, props<{ suggestion: fromSuggestions.Suggestion }>());
const DecrementUpvotesSucceeded = createAction(DECREMENT_UPVOTES_SUCCEEDED, props<{ suggestionUpdated: fromSuggestions.Suggestion }>());
const DecrementUpvotesFailed = createAction(DECREMENT_UPVOTES_FAILED, props<{ error: HttpErrorResponse }>());

/* INCREMENT UPVOTES ACTIONS */

const IncrementUpvotesStart = createAction(INCREMENT_UPVOTES_START, props<{ suggestion: fromSuggestions.Suggestion }>());
const IncrementUpvotesSucceeded = createAction(INCREMENT_UPVOTES_SUCCEEDED, props<{ suggestionUpdated: fromSuggestions.Suggestion }>());
const IncrementUpvotesFailed = createAction(INCREMENT_UPVOTES_FAILED, props<{ error: HttpErrorResponse }>());

/* INCREMENT NUMBER OF COMMENTS ACTIONS */

const IncrementNumberOfCommentsStart = createAction(INCREMENT_NUMBER_OF_COMMENTS_START, props<{ suggestion: fromSuggestions.Suggestion }>());
const IncrementNumberOfCommentsSucceeded = createAction(INCREMENT_NUMBER_OF_COMMENTS_SUCCEEDED, props<{ suggestionUpdated: fromSuggestions.Suggestion }>());
const IncrementNumberOfCommentsFailed = createAction(INCREMENT_NUMBER_OF_COMMENTS_FAILED, props<{ error: HttpErrorResponse }>());

/* FETCH SUGGESTIONS ACTIONS */

const FetchSuggestionsStart = createAction(FETCHING_SUGGESTIONS_START, props<{ query: fromSuggestions.SuggestionsQuery }>());
const FetchSuggestionsSucceeded = createAction(FETCHING_SUGGESTIONS_SUCCEEDED, props<{ suggestions: fromSuggestions.Suggestion[] }>());
const FetchSuggestionsFailed = createAction(FETCHING_SUGGESTIONS_FAILED, props<{ error: HttpErrorResponse }>());

/* FETCH ONE SUGGESTION ACTIONS */

const FetchOneSuggestionStart = createAction(FETCHING_ONE_SUGGESTION_START, props<{ suggestionId: number | null }>());
const FetchOneSuggestionSucceeded = createAction(FETCHING_ONE_SUGGESTION_SUCCEEDED, props<{ suggestion: fromSuggestions.Suggestion }>());
const FetchOneSuggestionFailed = createAction(FETCHING_ONE_SUGGESTION_FAILED, props<{ error: HttpErrorResponse }>());

/* SUGGESTION FORM MODE ACTIONS*/
const FormAddingMode = createAction(FORM_ADDING_MODE);
const FormEditingMode = createAction(FORM_EDITING_MODE);

/* SUGGESTIONS SORT ACTIONS */

const SortByMostUpvotes = createAction(SORT_BY_MOST_UPVOTES);
const SortByLeastUpvotes = createAction(SORT_BY_LEAST_UPVOTES);
const SortByMostComments = createAction(SORT_BY_MOST_COMMENTS);
const SortByLeastComments = createAction(SORT_BY_LEAST_COMMENTS);

export const suggestionActions =  {
  FetchSuggestionsStart: FetchSuggestionsStart,
  FetchSuggestionsSucceeded: FetchSuggestionsSucceeded,
  FetchSuggestionsFailed: FetchSuggestionsFailed,
  FetchOneSuggestionStart: FetchOneSuggestionStart,
  FetchOneSuggestionSucceeded: FetchOneSuggestionSucceeded,
  FetchOneSuggestionFailed: FetchOneSuggestionFailed,
  FormAddingMode: FormAddingMode,
  FormEditingMode: FormEditingMode,
  SortByMostUpvotes: SortByMostUpvotes,
  SortByLeastUpvotes: SortByLeastUpvotes,
  SortByMostComments: SortByMostComments,
  SortByLeastComments: SortByLeastComments,
  IncrementNumberOfCommentsStart: IncrementNumberOfCommentsStart,
  IncrementNumberOfCommentsSucceeded: IncrementNumberOfCommentsSucceeded,
  IncrementNumberOfCommentsFailed: IncrementNumberOfCommentsFailed,
  IncrementUpvotesStart: IncrementUpvotesStart,
  IncrementUpvotesSucceeded: IncrementUpvotesSucceeded,
  IncrementUpvotesFailed: IncrementUpvotesFailed,
  DecrementUpvotesStart: DecrementUpvotesStart,
  DecrementUpvotesSucceeded: DecrementUpvotesSucceeded,
  DecrementUpvotesFailed: DecrementUpvotesFailed,
  PostOneSuggestionStart: PostOneSuggestionStart,
  PostOneSuggestionSucceeded: PostOneSuggestionSucceeded,
  PostOneSuggestionFailed: PostOneSuggestionFailed,
  UpdateOneSuggestionStart: UpdateOneSuggestionStart,
  UpdateOneSuggestionSucceeded: UpdateOneSuggestionSucceeded,
  UpdateOneSuggestionFailed: UpdateOneSuggestionFailed,
  RemoveOneSuggestionStart: RemoveOneSuggestionStart,
  RemoveOneSuggestionSucceeded: RemoveOneSuggestionSucceeded,
  RemoveOneSuggestionFailed: RemoveOneSuggestionFailed,
};
/*  |
  FetchOneSuggestionStart | FetchOneSuggestionSucceeded | FetchOneSuggestionFailed |
  FormAddingMode | FormEditingMode | SortByMostUpvotes | SortByLeastUpvotes |
  SortByMostComments | SortByLeastComments | IncrementUpvotesStart |
  IncrementUpvotesSucceeded | IncrementUpvotesFailed | DecrementUpvotesStart |
  DecrementUpvotesSucceeded | DecrementUpvotesFailed | PostOneSuggestionStart |
  PostOneSuggestionSucceeded | PostOneSuggestionFailed | UpdateOneSuggestionStart |
  UpdateOneSuggestionSucceeded | UpdateOneSuggestionFailed |
  RemoveOneSuggestionStart | RemoveOneSuggestionSucceeded | RemoveOneSuggestionFailed |
  IncrementNumberOfCommentsStart | IncrementNumberOfCommentsSucceeded | IncrementNumberOfCommentsFailed */
