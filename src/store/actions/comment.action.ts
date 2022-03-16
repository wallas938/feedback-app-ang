import { Action } from "@ngrx/store";
import * as fromUser from "store/reducers/user.reducers";
import * as fromComment from "store/reducers/comment.reducers";
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

/* FETCH REPLIES IDENTIFIERS */

export const FETCH_REPLIES_START = '[REPLIES]  FETCH_REPLIES_START';
export const FETCH_REPLIES_SUCCEEDED = '[REPLIES]  FETCH_REPLIES_SUCCEEDED';
export const FETCH_REPLIES_FAILED = '[REPLIES]  FETCH_REPLIES_FAILED';


/*******
 *
 * ACTIONS
 *
 *******/

/* REPLIES ACTIONS */

export class FetchRepliesStart implements Action {
  readonly type = FETCH_REPLIES_START;
  constructor(public suggestionId: number) { }
}

export class FetchRepliesSucceeded implements Action {
  readonly type = FETCH_REPLIES_SUCCEEDED;
  constructor(public replies: fromComment.AppMessage[]) { }
}

export class FetchRepliesFailed implements Action {
  readonly type = FETCH_REPLIES_FAILED;
  constructor(public error: HttpErrorResponse) { }
}


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
  constructor(public suggestionId: number) { }
}

export class FetchCommentsSucceeded implements Action {
  readonly type = FETCH_COMMENTS_SUCCEEDED;
  constructor(public comments: fromComment.AppMessage[]) { }
}

export class FetchCommentsFailed implements Action {
  readonly type = FETCH_COMMENTS_FAILED;
  constructor(public error: HttpErrorResponse) { }
}


export type CommentActionsTypes =
  FetchCommentsStart | FetchCommentsSucceeded |
  FetchCommentsFailed | FetchOneCommentStart |
  FetchOneCommentSucceeded | FetchOneCommentFailed |
  FetchRepliesStart | FetchRepliesSucceeded | FetchRepliesFailed;
