import { createFeatureSelector, createSelector } from "@ngrx/store";
import * as fromUser from 'store/reducers/user.reducers';


const user = createFeatureSelector<fromUser.State>('user');

const getCurrentUser = createSelector(user, state => {
  return state.currentUser;
});

const getGlobalState = createSelector(user, state => {
  return state;
});

export const userSelectors = {
  getCurrentUser,
  getGlobalState,
}

