import { Action } from "@ngrx/store";
import * as fromSuggestions from "store/reducers/suggestions.reducers";

/* MOBILE MENU IDENTIFIERS */

export const MOBILE_MENU_OPENED = '[UI] MOBILE_MENU_OPENED';
export const MOBILE_MENU_CLOSED = '[UI] MOBILE_MENU_CLOSED';

/* FILTER MODAL IDENTIFIERS */

export const FILTER_MODAL_CLOSED = '[UI] FILTER_MODAL_CLOSED';
export const FILTER_MODAL_OPENED = '[UI] FILTER_MODAL_OPENED';

/* MOBILE ROADMAP CURRENT TAB IDENTIFIERS */

export const MOBILE_ROADMAP_CURRENT_TAB_CHANGED = '[UI] MOBILE_ROADMAP_CURRENT_TAB_CHANGED';


/* MOBILE MENU ACTIONS */

export class MobileMenuOpened implements Action {
  readonly type = MOBILE_MENU_OPENED;
}

export class MobileMenuClosed implements Action {
  readonly type = MOBILE_MENU_CLOSED;
}

/* FILTER MODAL ACTIONS */

export class FilterModalOpened implements Action {
  readonly type = FILTER_MODAL_OPENED;
}

export class FilterModalClosed implements Action {
  readonly type = FILTER_MODAL_CLOSED;
}

export class MobileRoadMapTabChanged implements Action {
  type: string = MOBILE_ROADMAP_CURRENT_TAB_CHANGED;
  constructor(public currentTab: fromSuggestions.STATUS = fromSuggestions.STATUS.IN_PROGRESS) { }
}

export type UiActionsTypes =
  MobileMenuOpened | MobileMenuClosed |
  FilterModalOpened | FilterModalClosed |
  MobileRoadMapTabChanged;
