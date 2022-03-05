import { ActionReducerMap } from '@ngrx/store';
import * as fromSuggestions from './suggestions.reducers';
import * as fromUi from './ui.reducers';

export const rootReducer = {};

export interface AppState {
  suggestions: fromSuggestions.State;
  ui: fromUi.State
}

export const reducers: ActionReducerMap<AppState, any> = {
    suggestions: fromSuggestions.suggestionReducer,
    ui: fromUi.uiReducer
};
