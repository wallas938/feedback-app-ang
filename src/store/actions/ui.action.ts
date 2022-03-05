import { Action } from "@ngrx/store";

/* FETCH SUGGESTIONS IDENTIFIERS */

export const MOBILE_MENU_OPENED = '[UI] MOBILE_MENU_OPENED';
export const MOBILE_MENU_CLOSED = '[UI] MOBILE_MENU_CLOSED';


export class MobileMenuOpened implements Action {
  readonly type = MOBILE_MENU_OPENED;
}

export class MobileMenuClosed implements Action {
  readonly type = MOBILE_MENU_CLOSED;
}

export type UiActionsTypes = MobileMenuOpened | MobileMenuClosed;
