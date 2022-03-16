import { ActionReducerMap } from '@ngrx/store';
import * as fromSuggestions from './suggestions.reducers';
import * as fromRouter from './router.reducers';
import * as fromLayout from './layout.reducers';
import * as fromComment from './comment.reducers';
import * as fromUser from './user.reducers';

export const rootReducer = {};

export interface AppState {
  suggestions: fromSuggestions.State;
  layout: fromLayout.State,
  router: fromRouter.State,
  comment: fromComment.State,
  user: fromUser.State
}

export const reducers: ActionReducerMap<AppState, any> = {
  suggestions: fromSuggestions.suggestionReducer,
  layout: fromLayout.uiReducer,
  router: fromRouter.routerReducer,
  comment: fromComment.commentReducer,
  user: fromUser.userReducer
};
