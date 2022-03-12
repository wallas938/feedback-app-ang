import { Action } from "@ngrx/store";
import * as fromUser from "store/reducers/user.reducers";

/*******
 *
 * IDENTIFIERS
 *
 *******/

/* FETCH SUGGESTIONS IDENTIFIERS */

export const FETCH_USER_START = '[USER]  FETCH_USER_START';
export const FETCH_USER_SUCCEEDED = '[USER]  FETCH_USER_SUCCEEDED';
export const FETCH_USER_FAILED = '[USER]  FETCH_USER_FAILED';


export class FetchUserStart implements Action {
  readonly type = FETCH_USER_START;
  constructor(public userId: number) { }
}

export class FetchUserSucceeded implements Action {
  readonly type = FETCH_USER_SUCCEEDED;
  constructor(public userId: number) { }
}


export type UserActionsTypes = FetchUserStart | FetchUserSucceeded;
