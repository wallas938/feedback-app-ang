import { Action } from "@ngrx/store";
import * as fromSuggestions from "store/reducers/suggestions.reducers";

/*******
 *
 * IDENTIFIERS
 *
 *******/

/* FETCH SUGGESTIONS IDENTIFIERS */

export const REDIRECT_TO = '[Router]  REDIRECT_TO';


export class RedirectTo implements Action {
  readonly type = REDIRECT_TO;
  constructor(public toRedirect: boolean, public redirectTo: string) { }
}


export type RouterActionsTypes = RedirectTo;
