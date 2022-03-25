import { createFeatureSelector, createSelector } from "@ngrx/store";
import * as fromRouter from 'store/reducers/router.reducers';


const router = createFeatureSelector<fromRouter.State>('router');

const getRedirectTo = createSelector(router, state => {
  return state.redirectTo;
});

const getToRedirect = createSelector(router, state => {
  return state.toRedirect;
});

const getGloabalState = createSelector(router, state => {
  return state;
});

export const routerSelectors = {
  getRedirectTo,
  getToRedirect,
  getGloabalState
}

