import { Action, createReducer, on } from "@ngrx/store";
import { routerActions } from "store/actions/router.actions";

export interface State {
  toRedirect: boolean,
  redirectTo: string
}

const initialState: State = {
  toRedirect: false,
  redirectTo: null,
}

/* export function routerReducer(state: State = initialState, action: fromRouterActions.RouterActionsTypes) {
  switch (action.type) {
    case fromRouterActions.REDIRECT_TO:
      return {
        ...state,
        toRedirect: action.toRedirect,
        redirectTo: action.redirectTo
      }
    default:
      return {
        ...state
      }
  }
} */

export const _routerReducer = createReducer(
  initialState,
  on(routerActions.RedirectTo, (state, { redirectTo, toRedirect }) => {
    return {
      ...state,
      toRedirect: toRedirect,
      redirectTo: redirectTo
    }
  })
)

export function routerReducer(state: State | undefined, action: Action) {
  return _routerReducer(state, action);
}
