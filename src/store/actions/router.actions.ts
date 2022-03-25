import { createAction, props } from "@ngrx/store";

/*******
 *
 * IDENTIFIERS
 *
 *******/

/* FETCH SUGGESTIONS IDENTIFIERS */

 const REDIRECT_TO = '[Router]  REDIRECT_TO';

const RedirectTo = createAction(REDIRECT_TO, props<{ toRedirect: boolean, redirectTo: string }>());

/* export class RedirectTo implements Action {
  readonly type = REDIRECT_TO;
  constructor(public toRedirect: boolean, public redirectTo: string) { }
} */


export const routerActions = {
  RedirectTo
};
