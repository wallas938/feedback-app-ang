import { createFeatureSelector, createSelector } from "@ngrx/store";
import * as fromLayout from 'store/reducers/layout.reducers';


const layout = createFeatureSelector<fromLayout.State>('layout');

const getmobileMenuOpened = createSelector(layout, state => {
  return state.mobileMenuOpened;
});

const getSortModalOpened = createSelector(layout, state => {
  return state.sortModalOpened;
});

const getMobileRoadmapCurrentTab = createSelector(layout, state => {
  return state.mobileRoadmapCurrentTab;
});

export const layoutSelectors = {
  getmobileMenuOpened,
  getSortModalOpened,
  getMobileRoadmapCurrentTab

}

