import { Action } from "@ngrx/store";
import * as fromUser from "store/reducers/user.reducers";
import * as fromComments from "store/reducers/comment.reducers";
import { HttpErrorResponse } from "@angular/common/http";

/*******
 *
 * IDENTIFIERS
 *
 *******/

/* FETCH COMMENTS IDENTIFIERS */

export const FETCH_COMMENTS_START = '[COMMENTS]  FETCH_COMMENTS_START';
export const FETCH_COMMENTS_SUCCEEDED = '[COMMENTS]  FETCH_COMMENTS_SUCCEEDED';
export const FETCH_COMMENTS_FAILED = '[COMMENTS]  FETCH_COMMENTS_FAILED';

/* FETCH ONE COMMENT IDENTIFIERS */

export const FETCH_ONE_COMMENT_START = '[COMMENTS]  FETCH_ONE_COMMENT_START';
export const FETCH_ONE_COMMENT_SUCCEEDED = '[COMMENTS]  FETCH_ONE_COMMENT_SUCCEEDED';
export const FETCH_ONE_COMMENT_FAILED = '[COMMENTS]  FETCH_ONE_COMMENT_FAILED';


/*******
 *
 * ACTIONS
 *
 *******/


/* COMMENTS ACTIONS */

export class FetchOneCommentStart implements Action {
  readonly type = FETCH_ONE_COMMENT_START;
  constructor(public fromId: number) { }
}

export class FetchOneCommentSucceeded implements Action {
  readonly type = FETCH_ONE_COMMENT_SUCCEEDED;
  constructor(public comment: Comment) { }
}

export class FetchOneCommentFailed implements Action {
  readonly type = FETCH_ONE_COMMENT_FAILED;
  constructor(public error: HttpErrorResponse) { }
}

export class FetchCommentsStart implements Action {
  readonly type = FETCH_COMMENTS_START;
  constructor(public userId: number) { }
}

export class FetchCommentsSucceeded implements Action {
  readonly type = FETCH_COMMENTS_SUCCEEDED;
  constructor(public comments: fromComments.Comment[]) { }
}

export class FetchCommentsFailed implements Action {
  readonly type = FETCH_COMMENTS_FAILED;
  constructor(public error: HttpErrorResponse) { }
}


export type CommentActionsTypes = FetchCommentsStart | FetchCommentsSucceeded | FetchCommentsFailed |
  FetchOneCommentStart | FetchOneCommentSucceeded | FetchOneCommentFailed;
