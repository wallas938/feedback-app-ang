import { Action } from "@ngrx/store";

/* MOBILE MENU IDENTIFIERS */

export const MOBILE_MENU_OPENED = '[UI] MOBILE_MENU_OPENED';
export const MOBILE_MENU_CLOSED = '[UI] MOBILE_MENU_CLOSED';

/* FILTER MODAL IDENTIFIERS */

export const FILTER_MODAL_CLOSED = '[UI] FILTER_MODAL_CLOSED';
export const FILTER_MODAL_OPENED = '[UI] FILTER_MODAL_OPENED';


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

export type UiActionsTypes = MobileMenuOpened | MobileMenuClosed | FilterModalOpened | FilterModalClosed;
