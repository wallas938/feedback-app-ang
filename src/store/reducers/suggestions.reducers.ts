/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpErrorResponse } from "@angular/common/http";
import { Action, createReducer, on } from "@ngrx/store";
import { suggestionActions } from "store/actions/suggestions.action";

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
  /* type?: suggestionActions */
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
  numberOfComments: number;
}

export const initialState: State = {
  suggestions: [],
  suggestion: null,
  suggestionsUpvoted: [],
  loadingState: false,
  formMode: FORM_MODES.FORM_ADDING_MODE,
  filterBy: null,
  sortBy: null,
  error: null
}

export const _suggestionReducer = createReducer(
  initialState,
  on(suggestionActions.FetchSuggestionsStart, (state, { query }) => {
    return {
      ...state,
      loadingState: true,
      filterBy: query._filter,
      sortBy: query._sort,
    }
  }),
  on(suggestionActions.FetchSuggestionsSucceeded, (state, { suggestions }) => {
    return {
      ...state,
      loadingState: false,
      suggestions: [...suggestions]
    }
  }),
  on(suggestionActions.FetchSuggestionsFailed, (state, { error }) => {
    return {
      ...state,
      loadingState: false,
      error: error
    }
  }),
  on(suggestionActions.FetchOneSuggestionStart, (state, { suggestionId }) => {
    return {
      ...state,
      loadingState: true
    }
  }),
  on(suggestionActions.FetchOneSuggestionSucceeded, (state, { suggestion }) => {
    return {
      ...state,
      loadingState: false,
      suggestion: suggestion
    }
  }),
  on(suggestionActions.FetchSuggestionsFailed, (state, { error }) => {
    return {
      ...state,
      loadingState: false,
      error: error
    }
  }),
  on(suggestionActions.PostOneSuggestionStart, (state, { suggestion }) => {
    return {
      ...state,
      loadingState: true
    }
  }),
  on(suggestionActions.PostOneSuggestionSucceeded, (state, { newSuggestion }) => {
    return {
      ...state,
      loadingState: false,
      suggestion: newSuggestion
    }
  }),
  on(suggestionActions.PostOneSuggestionFailed, (state, { error }) => {
    return {
      ...state,
      loadingState: false,
      error: error
    }
  }),
  on(suggestionActions.UpdateOneSuggestionStart, (state, { suggestionId, updatedSuggestion }) => {
    return {
      ...state,
      loadingState: true
    }
  }),
  on(suggestionActions.UpdateOneSuggestionSucceeded, (state, { updatedSuggestion }) => {
    return {
      ...state,
      loadingState: false,
      suggestion: updatedSuggestion
    }
  }),
  on(suggestionActions.UpdateOneSuggestionFailed, (state, { error }) => {
    return {
      ...state,
      loadingState: false,
      error: error
    }
  }),
  on(suggestionActions.RemoveOneSuggestionStart, (state, { suggestionId }) => {
    return {
      ...state,
      loadingState: true,
      suggestion: null
    }
  }),
  on(suggestionActions.RemoveOneSuggestionSucceeded, (state) => {
    return {
      ...state,
      loadingState: false,
    }
  }),
  on(suggestionActions.RemoveOneSuggestionFailed, (state, { error }) => {
    return {
      ...state,
      loadingState: false,
      error: error
    }
  }),
  on(suggestionActions.IncrementUpvotesStart, (state, { suggestion }) => {
    return {
      ...state,
      loadingState: true,
      suggestionsUpvoted: [...state.suggestionsUpvoted, suggestion.id]
    }
  }),
  on(suggestionActions.IncrementUpvotesSucceeded, (state, { suggestionUpdated }) => {
    return {
      ...state,
      loadingState: true,
      suggestion: suggestionUpdated
    }
  }),
  on(suggestionActions.IncrementUpvotesFailed, (state, { error }) => {
    return {
      ...state,
      loadingState: false,
      error: error
    }
  }),
  on(suggestionActions.IncrementNumberOfCommentsStart, (state, { suggestion }) => {
    return {
      ...state,
      loadingState: true,
    }
  }),
  on(suggestionActions.IncrementNumberOfCommentsSucceeded, (state, { suggestionUpdated }) => {
    return {
      ...state,
      loadingState: true,
      suggestion: suggestionUpdated
    }
  }),
  on(suggestionActions.IncrementNumberOfCommentsFailed, (state, { error }) => {
    return {
      ...state,
      loadingState: false,
      error: error
    }
  }),
  on(suggestionActions.DecrementUpvotesStart, (state, { suggestion }) => {
    return {
      ...state,
      loadingState: true,
      suggestionsUpvoted: state.suggestionsUpvoted.filter((id: number) => suggestion.id !== id)
    }
  }),
  on(suggestionActions.DecrementUpvotesSucceeded, (state, { suggestionUpdated }) => {
    return {
      ...state,
      loadingState: true,
      suggestion: suggestionUpdated
    }
  }),
  on(suggestionActions.DecrementUpvotesFailed, (state, { error }) => {
    return {
      ...state,
      loadingState: false,
      error: error
    }
  }),
  on(suggestionActions.FormAddingMode, (state) => {
    return {
      ...state,
      formMode: FORM_MODES.FORM_ADDING_MODE
    }
  }),
  on(suggestionActions.FormEditingMode, (state) => {
    return {
      ...state,
      formMode: FORM_MODES.FORM_EDITING_MODE
    }
  }),
)

export function suggestionReducer(state: State | undefined, action: Action) {
  return _suggestionReducer(state, action);
}

/* export function suggestionReducer(state: State = initialState, action: suggestionActions.) {
  switch (action.type) {
    case suggestionActions.FETCHING_SUGGESTIONS_START:
      return {
        ...state,
        loadingState: true,
        filterBy: action.query._filter,
        sortBy: action.query._sort,
      }
    case suggestionActions.FETCHING_SUGGESTIONS_SUCCEEDED:
      return {
        ...state,
        loadingState: false,
        suggestions: [...action.payload]
      }
    case suggestionActions.FETCHING_SUGGESTIONS_FAILED:

      return {
        ...state,
        loadingState: false,
        error: action.error
      }
    case suggestionActions.FETCHING_ONE_SUGGESTION_START:
      return {
        ...state,
        loadingState: true
      }
    case suggestionActions.FETCHING_ONE_SUGGESTION_SUCCEEDED:
      return {
        ...state,
        loadingState: false,
        suggestion: action.payload
      }
    case suggestionActions.FETCHING_ONE_SUGGESTION_FAILED:
      return {
        ...state,
        loadingState: false,
        error: action.error
      }
    case suggestionActions.POST_SUGGESTION_START:

      return {
        ...state,
        loadingState: true
      }
    case suggestionActions.POST_SUGGESTION_SUCCEEDED:
      return {
        ...state,
        loadingState: false,
        suggestion: action.newSuggestion
      }
    case suggestionActions.POST_SUGGESTION_FAILED:
      return {
        ...state,
        loadingState: false,
        error: action.error
      }
    case suggestionActions.UPDATE_SUGGESTION_START:

      return {
        ...state,
        loadingState: true
      }
    case suggestionActions.UPDATE_SUGGESTION_SUCCEEDED:
      return {
        ...state,
        loadingState: false,
        suggestion: action.updatedSuggestion
      }
    case suggestionActions.UPDATE_SUGGESTION_FAILED:
      return {
        ...state,
        loadingState: false,
        error: action.error
      }
    case suggestionActions.REMOVE_SUGGESTION_START:

      return {
        ...state,
        loadingState: true
      }
    case suggestionActions.REMOVE_SUGGESTION_SUCCEEDED:
      return {
        ...state,
        loadingState: false,
        suggestion: null
      }
    case suggestionActions.REMOVE_SUGGESTION_FAILED:
      return {
        ...state,
        loadingState: false,
        error: action.error
      }
    case suggestionActions.INCREMENT_UPVOTES_START:
      return {
        ...state,
        loadingState: true,
        suggestionsUpvoted: [...state.suggestionsUpvoted, action.suggestion.id]
      }
    case suggestionActions.INCREMENT_UPVOTES_SUCCEEDED:
      return {
        ...state,
        loadingState: true,
        suggestion: action.suggestionUpdated
      }
    case suggestionActions.INCREMENT_UPVOTES_FAILED:
      return {
        ...state,
        loadingState: false,
        error: action.error
      }
    case suggestionActions.INCREMENT_NUMBER_OF_COMMENTS_START:
      return {
        ...state,
        loadingState: true,
      }
    case suggestionActions.INCREMENT_NUMBER_OF_COMMENTS_SUCCEEDED:
      return {
        ...state,
        loadingState: true,
        suggestion: action.suggestionUpdated
      }
    case suggestionActions.INCREMENT_NUMBER_OF_COMMENTS_FAILED:
      return {
        ...state,
        loadingState: false,
        error: action.error
      }
    case suggestionActions.DECREMENT_UPVOTES_START:
      return {
        ...state,
        loadingState: true,
        suggestionsUpvoted: state.suggestionsUpvoted.filter((id: number) => action.suggestion.id !== id)
      }
    case suggestionActions.DECREMENT_UPVOTES_SUCCEEDED:
      return {
        ...state,
        loadingState: true,
        suggestion: action.suggestionUpdated
      }
    case suggestionActions.DECREMENT_UPVOTES_FAILED:
      return {
        ...state,
        loadingState: false,
        error: action.error
      }
    case suggestionActions.FORM_ADDING_MODE:

      return {
        ...state,
        formMode: FORM_MODES.FORM_ADDING_MODE
      }
    case suggestionActions.FORM_EDITING_MODE:
      return {
        ...state,
        formMode: FORM_MODES.FORM_EDITING_MODE
      }
    default:
      return {
        ...state,
      }
  }
} */
