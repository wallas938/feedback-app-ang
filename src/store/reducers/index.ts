import { ActionReducerMap } from '@ngrx/store';
import { suggestionReducer, SuggestionsState } from './suggestions.reducers';

export const rootReducer = {};

export interface AppState {
  suggestions: SuggestionsState;
}


export const reducers: ActionReducerMap<AppState, any> = {
    suggestions: suggestionReducer
};
