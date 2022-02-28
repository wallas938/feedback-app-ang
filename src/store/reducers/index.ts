import { ActionReducerMap } from '@ngrx/store';
import * as fromSuggestions from './suggestions.reducers';

export const rootReducer = {};

export interface AppState {
  suggestions: fromSuggestions.State;
}


export const reducers: ActionReducerMap<AppState, any> = {
    suggestions: fromSuggestions.suggestionReducer
};
