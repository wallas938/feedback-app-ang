import { createFeatureSelector, createSelector } from "@ngrx/store";
import * as fromLayout from 'store/reducers/layout.reducers';


const layout = createFeatureSelector<fromLayout.State>('layout');

const getUserIdentityModaleState = createSelector(layout, state => {
  return state.userIdentityModalState;
});

const getmobileMenuOpened = createSelector(layout, state => {
  return state.mobileMenuOpened;
});

const getSortModalOpened = createSelector(layout, state => {
  return state.sortModalOpened;
});

const getMobileRoadmapCurrentTab = createSelector(layout, state => {
  return state.mobileRoadmapCurrentTab;
});

const getGlobalState = createSelector(layout, state => {
  return state;
});

export const layoutSelectors = {
  getUserIdentityModaleState,
  getmobileMenuOpened,
  getSortModalOpened,
  getMobileRoadmapCurrentTab,
  getGlobalState
}

