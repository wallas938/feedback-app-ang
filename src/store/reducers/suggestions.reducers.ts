/* eslint-disable @typescript-eslint/no-unused-vars */
import * as SuggestionActions from "store/actions/suggestions.action";

export enum FORM_MODES {
  FORM_ADDING_MODE = "FORM_ADDING_MODE",
  FORM_EDITING_MODE = "FORM_EDITING_MODE",
}

export enum FILTER {
  MOST_UPVOTES = "Most Upvotes",
  LEAST_UPVOTES = "Least Upvotes",
  MOST_COMMENTS = "Most Comments",
  LEAST_COMMENTS = "Least Comments"
}

export interface State {
  suggestions: Suggestion[];
  suggestion: Suggestion;
  loadingState: boolean;
  formMode: FORM_MODES;
  filterBy: FILTER
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
  loadingState: false,
  formMode: FORM_MODES.FORM_ADDING_MODE,
  filterBy: null
}

export function suggestionReducer(state: State = initialState, action: SuggestionActions.SuggestionActionsTypes) {
  switch (action.type) {
    case SuggestionActions.FETCHING_SUGGESTIONS_START:

      return {
        ...state,
        loadingState: true,
        filterBy: action.payload
      }
    case SuggestionActions.FETCHING_SUGGESTIONS_SUCCEEDED:
      console.log(action.payload);

      return {
        ...state,
        loadingState: false,
        suggestions: [...action.payload]
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
    /* case SuggestionActions.FILTER_BY_MOST_UPVOTES:
      return {
        ...state,
        loadingState: true
      }
    case SuggestionActions.FILTER_BY_LEAST_UPVOTES:
      return {
        ...state,
        loadingState: false,
      }
    case SuggestionActions.FILTER_BY_MOST_COMMENTS:

      return {
        ...state,
      }
    case SuggestionActions.FILTER_BY_LEAST_COMMENTS:
      return {
        ...state,
      } */
    default:
      return {
        ...state,
      }
  }
}
