import * as UIActions from "store/actions/ui.action";

export interface State {
  mobileMenuOpened: boolean;
}

const initialState: State = {
  mobileMenuOpened: false
}

export function uiReducer(state: State = initialState, action: UIActions.UiActionsTypes) {
  switch (action.type) {
    case UIActions.MOBILE_MENU_CLOSED:

      return {
        ...state,
        mobileMenuOpened: false
      }
    case UIActions.MOBILE_MENU_OPENED:

      return {
        ...state,
        mobileMenuOpened: true
      }

    default:
      return {
        ...state
      }
  }
}
