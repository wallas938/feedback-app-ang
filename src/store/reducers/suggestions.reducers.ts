/* eslint-disable @typescript-eslint/no-unused-vars */
import * as SuggestionActions from "store/actions/suggestions.action";


export interface State {
  suggestions: Suggestion[];
  loadingState: boolean;
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
  loadingState: false
}

export function suggestionReducer(state: State = initialState, action: SuggestionActions.SuggestionActionsTypes) {
  switch (action.type) {
    case SuggestionActions.FETCHING_SUGGESTIONS_START:

      return {
        ...state,
        loadingState: true
      }
    case SuggestionActions.FETCHING_SUGGESTIONS_SUCCEEDED:
      return {
        ...state,
        loadingState: false,
        suggestions: [...action.payload]
      }
    default:
      return {
        ...state,
      }
  }
}
