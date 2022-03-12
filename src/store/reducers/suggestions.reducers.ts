/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpErrorResponse } from "@angular/common/http";
import * as SuggestionActions from "store/actions/suggestions.action";
import * as fromUser from "store/reducers/user.reducers";

export enum FORM_MODES {
  FORM_ADDING_MODE = "FORM_ADDING_MODE",
  FORM_EDITING_MODE = "FORM_EDITING_MODE",
}

export enum SORT {
  MOST_UPVOTES = "Most Upvotes",
  LEAST_UPVOTES = "Least Upvotes",
  MOST_COMMENTS = "Most Comments",
  LEAST_COMMENTS = "Least Comments"
}

export enum FILTER {
  BY_ALL = "BY_ALL",
  BY_BUG = "BY_BUG",
  BY_ENHANCEMENT = "BY_ENHANCEMENT",
  BY_UI = "BY_UI",
  BY_UX = "BY_UX",
  BY_FEATURE = "BY_FEATURE",
}

export enum STATUS {
  PLANNED = "PLANNED",
  IN_PROGRESS = "IN_PROGRESS",
  LIVE = "LIVE",
  SUGGESTION = "SUGGESTION",
}

export interface SuggestionsQuery {
  _sort: SORT,
  _filter: FILTER,
  type?: SuggestionActions.SuggestionActionsTypes
}


export interface State {
  suggestions: Suggestion[];
  suggestion: Suggestion;
  suggestionsUpvoted: number[];
  loadingState: boolean;
  formMode: FORM_MODES;
  sortBy: SORT,
  filterBy: FILTER,
  error: HttpErrorResponse
}

export interface Suggestion {
  id?: number;
  title: string;
  category: string;
  upvotes: number;
  status: string;
  description: string;
  comments?: Comment[];
}



export interface Reply {
  content: string;
  replyingTo: string;
  user: fromUser.User;
}



const initialState: State = {
  suggestions: [],
  suggestion: null,
  suggestionsUpvoted: [],
  loadingState: false,
  formMode: FORM_MODES.FORM_ADDING_MODE,
  filterBy: null,
  sortBy: null,
  error: null
}

export function suggestionReducer(state: State = initialState, action: SuggestionActions.SuggestionActionsTypes) {
  switch (action.type) {
    case SuggestionActions.FETCHING_SUGGESTIONS_START:
      return {
        ...state,
        loadingState: true,
        filterBy: action.query._filter,
        sortBy: action.query._sort,
      }
    case SuggestionActions.FETCHING_SUGGESTIONS_SUCCEEDED:
      return {
        ...state,
        loadingState: false,
        suggestions: [...action.payload]
      }
    case SuggestionActions.FETCHING_SUGGESTIONS_FAILED:

      return {
        ...state,
        loadingState: false,
        error: action.error
      }
    case SuggestionActions.FETCHING_ONE_SUGGESTION_START:
      return {
        ...state,
        loadingState: true
      }
    case SuggestionActions.FETCHING_ONE_SUGGESTION_SUCCEEDED:
      return {
        ...state,
        loadingState: false,
        suggestion: action.payload
      }
    case SuggestionActions.FETCHING_ONE_SUGGESTION_FAILED:
      return {
        ...state,
        loadingState: false,
        error: action.error
      }
    case SuggestionActions.POST_SUGGESTION_START:

      return {
        ...state,
        loadingState: true
      }
    case SuggestionActions.POST_SUGGESTION_SUCCEEDED:
      return {
        ...state,
        loadingState: false,
        suggestion: action.newSuggestion
      }
    case SuggestionActions.POST_SUGGESTION_FAILED:
      return {
        ...state,
        loadingState: false,
        error: action.error
      }
    case SuggestionActions.UPDATE_SUGGESTION_START:

      return {
        ...state,
        loadingState: true
      }
    case SuggestionActions.UPDATE_SUGGESTION_SUCCEEDED:
      return {
        ...state,
        loadingState: false,
        suggestion: action.updatedSuggestion
      }
    case SuggestionActions.UPDATE_SUGGESTION_FAILED:
      return {
        ...state,
        loadingState: false,
        error: action.error
      }
    case SuggestionActions.REMOVE_SUGGESTION_START:

      return {
        ...state,
        loadingState: true
      }
    case SuggestionActions.REMOVE_SUGGESTION_SUCCEEDED:
      return {
        ...state,
        loadingState: false,
        suggestion: null
      }
    case SuggestionActions.REMOVE_SUGGESTION_FAILED:
      return {
        ...state,
        loadingState: false,
        error: action.error
      }
    case SuggestionActions.INCREMENT_UPVOTES_START:
      return {
        ...state,
        loadingState: true,
        suggestionsUpvoted: [...state.suggestionsUpvoted, action.suggestion.id]
      }
    case SuggestionActions.INCREMENT_UPVOTES_SUCCEEDED:
      return {
        ...state,
        loadingState: true,
        suggestion: action.suggestionUpdated
      }
    case SuggestionActions.INCREMENT_UPVOTES_FAILED:
      return {
        ...state,
        loadingState: false,
        error: action.error
      }
    case SuggestionActions.DECREMENT_UPVOTES_START:
      return {
        ...state,
        loadingState: true,
        suggestionsUpvoted: state.suggestionsUpvoted.filter((id: number) => action.suggestion.id !== id)
      }
    case SuggestionActions.DECREMENT_UPVOTES_SUCCEEDED:
      return {
        ...state,
        loadingState: true,
        suggestion: action.suggestionUpdated
      }
    case SuggestionActions.DECREMENT_UPVOTES_FAILED:
      return {
        ...state,
        loadingState: false,
        error: action.error
      }
    case SuggestionActions.POST_COMMENT_START:

      return {
        ...state,
        loadingState: true
      }
    case SuggestionActions.POST_COMMENT_SUCCEEDED:
      return {
        ...state,
        loadingState: false,
        suggestion: action.suggestionUpdated
      }
    case SuggestionActions.POST_COMMENT_FAILED:
      return {
        ...state,
        loadingState: false,
        error: action.error
      }
    case SuggestionActions.FORM_ADDING_MODE:

      return {
        ...state,
        formMode: FORM_MODES.FORM_ADDING_MODE
      }
    case SuggestionActions.FORM_EDITING_MODE:
      return {
        ...state,
        formMode: FORM_MODES.FORM_EDITING_MODE
      }
    default:
      return {
        ...state,
      }
  }
}
