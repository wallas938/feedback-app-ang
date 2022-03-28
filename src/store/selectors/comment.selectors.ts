import { createFeatureSelector, createSelector } from "@ngrx/store";
import * as fromComment from 'store/reducers/comment.reducers';


const commentFeature = createFeatureSelector<fromComment.State>('commentFeature');

const getLoadingStatus = createSelector(commentFeature, state => {
  return state.loading;
});

const getError = createSelector(commentFeature, state => {
  return state.error;
});

const getComments = createSelector(commentFeature, state => {
  return state.comments;
});

const getGlobalState = createSelector(commentFeature, state => {
  return state
})

export const commentSelectors = {
  getLoadingStatus,
  getComments,
  getGlobalState,
  getError
}

