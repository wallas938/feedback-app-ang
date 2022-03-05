import * as UIActions from "store/actions/ui.action";

export interface State {
  mobileMenuOpened: boolean;
  sortModalOpened: boolean;
}

const initialState: State = {
  mobileMenuOpened: false,
  sortModalOpened: false
}

export function uiReducer(state: State = initialState, action: UIActions.UiActionsTypes) {
  switch (action.type) {
    case UIActions.MOBILE_MENU_CLOSED:

      return {
        ...state,
        mobileMenuOpened: false,
        sortModalOpened: false
      }
    case UIActions.MOBILE_MENU_OPENED:

      return {
        ...state,
        mobileMenuOpened: true,
        sortModalOpened: false
      }
    case UIActions.FILTER_MODAL_CLOSED:

      return {
        ...state,
        mobileMenuOpened: false,
        sortModalOpened: false
      }
    case UIActions.FILTER_MODAL_OPENED:

      return {
        ...state,
        mobileMenuOpened: false,
        sortModalOpened: true
      }

    default:
      return {
        ...state
      }
  }
}
