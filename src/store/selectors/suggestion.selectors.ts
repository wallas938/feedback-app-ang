import { createFeatureSelector, createSelector } from "@ngrx/store";
import * as fromSuggestion from 'store/reducers/suggestions.reducers';


const suggestionFeature = createFeatureSelector<fromSuggestion.State>('suggestionFeature');

const getSuggestions = createSelector(suggestionFeature, state => {
  return state.suggestions;
});

const getSuggestion = createSelector(suggestionFeature, state => {
  return state.suggestion;
});

const getSuggestionsUpvoted = createSelector(suggestionFeature, state => {
  return state.suggestionsUpvoted;
});

const getLoadingState = createSelector(suggestionFeature, state => {
  return state.loadingState;
});

const getFormMode = createSelector(suggestionFeature, state => {
  return state.formMode;
});

const getSortByValue = createSelector(suggestionFeature, state => {
  return state.sortBy;
});

const getFilterByValue = createSelector(suggestionFeature, state => {
  return state.filterBy;
});

const getCurrentError = createSelector(suggestionFeature, state => {
  return state.error;
});

export const suggestionSelectors = {
  getSuggestions,
  getSuggestion,
  getSuggestionsUpvoted,
  getLoadingState,
  getFormMode,
  getSortByValue,
  getFilterByValue,
  getCurrentError

}

