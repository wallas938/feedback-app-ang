import * as UIActions from "store/actions/layout.action";
import * as fromSuggestions from "store/reducers/suggestions.reducers";

export interface State {
  mobileMenuOpened: boolean;
  sortModalOpened: boolean;
  mobileRoadmapCurrentTab: fromSuggestions.STATUS;
}

const initialState: State = {
  mobileMenuOpened: false,
  sortModalOpened: false,
  mobileRoadmapCurrentTab: fromSuggestions.STATUS.IN_PROGRESS
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

    case UIActions.MOBILE_ROADMAP_CURRENT_TAB_CHANGED:

      return {
        ...state,
        mobileRoadmapCurrentTab: action.currentTab
      }

    default:
      return {
        ...state
      }
  }
}
