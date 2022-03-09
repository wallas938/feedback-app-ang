import * as fromRouterActions from "store/actions/router.actions";

export interface State {
  toRedirect: boolean,
  redirectTo: string
}

const initialState: State = {
  toRedirect: false,
  redirectTo: null,
}

export function routerReducer(state: State = initialState, action: fromRouterActions.RouterActionsTypes) {
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
}
