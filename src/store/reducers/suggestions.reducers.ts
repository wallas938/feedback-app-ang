/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpErrorResponse } from "@angular/common/http";
import * as SuggestionActions from "store/actions/suggestions.action";

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
  id: number;
  title: string;
  category: string;
  upvotes: number;
  status: string;
  description: string;
  comments?: Comment[];
}

export interface Comment {
  id: number;
  content: string;
  user: User;
  replies?: Reply[]
}

export interface Reply {
  content: string;
  replyingTo: string;
  user: User;
}

export interface User {
  image: string;
  name: string;
  username: string;
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
        loadingState: false
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
      console.log(action.error);
      return {
        ...state,
        loadingState: false,
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
      console.log(action.error);
      return {
        ...state,
        loadingState: false,
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
