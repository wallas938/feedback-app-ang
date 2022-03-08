import { ActionReducerMap } from '@ngrx/store';
import * as fromSuggestions from './suggestions.reducers';
import * as fromLayout from './layout.reducers';

export const rootReducer = {};

export interface AppState {
  suggestions: fromSuggestions.State;
  layout: fromLayout.State
}

export const reducers: ActionReducerMap<AppState, any> = {
    suggestions: fromSuggestions.suggestionReducer,
    layout: fromLayout.uiReducer
};
