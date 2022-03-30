import { createAction, props } from "@ngrx/store";
import * as fromSuggestions from "store/reducers/suggestions.reducers";

/* FILTER MODAL IDENTIFIERS */

const USER_IDENTITY_MODAL_OPENED = '[UI] USER_IDENTITY_MODAL_OPENED';
const USER_IDENTITY_MODAL_CLOSED = '[UI] USER_IDENTITY_MODAL_CLOSED';

/* MOBILE MENU IDENTIFIERS */

const MOBILE_MENU_OPENED = '[UI] MOBILE_MENU_OPENED';
const MOBILE_MENU_CLOSED = '[UI] MOBILE_MENU_CLOSED';

/* FILTER MODAL IDENTIFIERS */

const FILTER_MODAL_CLOSED = '[UI] FILTER_MODAL_CLOSED';
const FILTER_MODAL_OPENED = '[UI] FILTER_MODAL_OPENED';


/* MOBILE ROADMAP CURRENT TAB IDENTIFIERS */

const MOBILE_ROADMAP_CURRENT_TAB_CHANGED = '[UI] MOBILE_ROADMAP_CURRENT_TAB_CHANGED';

/* MOBILE MENU ACTIONS */

const UserIdentityModalOpened = createAction(USER_IDENTITY_MODAL_OPENED);
const UserIdentityModalClosed = createAction(USER_IDENTITY_MODAL_CLOSED);

/* MOBILE MENU ACTIONS */

const MobileMenuOpened = createAction(MOBILE_MENU_OPENED);
const MobileMenuClosed = createAction(MOBILE_MENU_CLOSED);

/* FILTER MODAL ACTIONS */
const FilterModalOpened = createAction(FILTER_MODAL_OPENED);
const FilterModalClosed = createAction(FILTER_MODAL_CLOSED);

const MobileRoadMapTabChanged = createAction(MOBILE_ROADMAP_CURRENT_TAB_CHANGED, props<{ currentTab: fromSuggestions.STATUS }>());

export const LayoutActions = {
  UserIdentityModalOpened,
  UserIdentityModalClosed,
  MobileMenuOpened,
  MobileMenuClosed,
  FilterModalOpened,
  FilterModalClosed,
  MobileRoadMapTabChanged
};
