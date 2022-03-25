import { HttpErrorResponse } from "@angular/common/http";
import { Action, createAction, props } from "@ngrx/store";
import * as fromUser from "store/reducers/user.reducers";

/*******
 *
 * IDENTIFIERS
 *
 *******/

/* FETCH SUGGESTIONS IDENTIFIERS */

const FETCH_USER_START = '[USER]  FETCH_USER_START';
const FETCH_USER_SUCCEEDED = '[USER]  FETCH_USER_SUCCEEDED';
const FETCH_USER_FAILED = '[USER]  FETCH_USER_FAILED';


const FetchUserStart = createAction(FETCH_USER_START, props<{ userId: number }>());
const FetchUserSucceeded = createAction(FETCH_USER_SUCCEEDED, props<{ userId: number }>());
const FetchUserFailed = createAction(FETCH_USER_FAILED, props<{ error: HttpErrorResponse }>());




export const UserActions = {
  FetchUserStart,
  FetchUserSucceeded,
  FetchUserFailed
}

