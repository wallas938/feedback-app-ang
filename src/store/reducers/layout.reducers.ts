import { Action, createReducer, on } from "@ngrx/store";
import { LayoutActions } from "store/actions/layout.action";
import * as fromSuggestions from "store/reducers/suggestions.reducers";

export interface State {
  userIdentityModalState: boolean;
  mobileMenuOpened: boolean;
  sortModalOpened: boolean;
  mobileRoadmapCurrentTab: fromSuggestions.STATUS;
}

const initialState: State = {
  userIdentityModalState: true,
  mobileMenuOpened: false,
  sortModalOpened: false,
  mobileRoadmapCurrentTab: fromSuggestions.STATUS.IN_PROGRESS
}


export const _layoutReducer = createReducer(
  initialState,
  on(LayoutActions.UserIdentityModalClosed, (state) => {
    return {
      ...state,
      userIdentityModalState: false,
      mobileMenuOpened: false,
      sortModalOpened: false
    }
  }),
  on(LayoutActions.UserIdentityModalOpened, (state) => {
    return {
      ...state,
      userIdentityModalState: true,
      mobileMenuOpened: true,
      sortModalOpened: false
    }
  }),
  on(LayoutActions.MobileMenuClosed, (state) => {
    return {
      ...state,
      mobileMenuOpened: false,
      sortModalOpened: false
    }
  }),
  on(LayoutActions.MobileMenuOpened, (state) => {
    return {
      ...state,
      mobileMenuOpened: true,
      sortModalOpened: false
    }
  }),
  on(LayoutActions.FilterModalClosed, (state) => {
    return {
      ...state,
      mobileMenuOpened: false,
      sortModalOpened: false
    }
  }),
  on(LayoutActions.FilterModalOpened, (state) => {
    return {
      ...state,
      mobileMenuOpened: false,
      sortModalOpened: true
    }
  }),
  on(LayoutActions.MobileRoadMapTabChanged, (state) => {
    return {
      ...state,
      mobileRoadmapCurrentTab: state.mobileRoadmapCurrentTab
    }
  })
)

export function layoutReducer(state: State | undefined, action: Action) {
  return _layoutReducer(state, action);
}
