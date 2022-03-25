import { Action, createAction, props } from "@ngrx/store";
import * as fromComment from "store/reducers/comment.reducers";
import { HttpErrorResponse } from "@angular/common/http";
import { ReplyData } from "@/app/pages/feedback-page/models/reply-data";

/*******
 *
 * IDENTIFIERS
 *
 *******/

/* FETCH COMMENTS IDENTIFIERS */

const FETCH_COMMENTS_START = '[COMMENTS]  FETCH_COMMENTS_START';
const FETCH_COMMENTS_SUCCEEDED = '[COMMENTS]  FETCH_COMMENTS_SUCCEEDED';
const FETCH_COMMENTS_FAILED = '[COMMENTS]  FETCH_COMMENTS_FAILED';

/* FETCH ONE COMMENT IDENTIFIERS */

const FETCH_ONE_COMMENT_START = '[COMMENTS]  FETCH_ONE_COMMENT_START';
const FETCH_ONE_COMMENT_SUCCEEDED = '[COMMENTS]  FETCH_ONE_COMMENT_SUCCEEDED';
const FETCH_ONE_COMMENT_FAILED = '[COMMENTS]  FETCH_ONE_COMMENT_FAILED';

const POST_COMMENT_START = '[COMMENTS]  POST_COMMENT_START';
const POST_COMMENT_SUCCEEDED = '[COMMENTS]  POST_COMMENT_SUCCEEDED';
const POST_COMMENT_FAILED = '[COMMENTS]  POST_COMMENT_FAILED';

/* FETCH REPLIES IDENTIFIERS */

const FETCH_REPLIES_START = '[COMMENTS]  FETCH_REPLIES_START';
const FETCH_REPLIES_SUCCEEDED = '[COMMENTS]  FETCH_REPLIES_SUCCEEDED';
const FETCH_REPLIES_FAILED = '[COMMENTS]  FETCH_REPLIES_FAILED';

const POST_REPLY_START = '[COMMENTS]  POST_REPLY_START';
const POST_REPLY_SUCCEEDED = '[COMMENTS]  POST_REPLY_SUCCEEDED';
const POST_REPLY_FAILED = '[COMMENTS]  POST_REPLY_FAILED';


/*******
 *
 * ACTIONS
 *
 *******/

/* REPLIES ACTIONS */

const FetchRepliesStart = createAction(FETCH_REPLIES_START, props<{ suggestionId: number }>());
const FetchRepliesSucceeded = createAction(FETCH_REPLIES_SUCCEEDED, props<{ replies: fromComment.AppMessage[] }>());
const FetchRepliesFailed = createAction(FETCH_REPLIES_FAILED, props<{ error: HttpErrorResponse }>());
const PostReplyStart = createAction(POST_REPLY_START, props<{ reply: fromComment.AppMessage }>());
const PostReplySucceeded = createAction(POST_REPLY_SUCCEEDED, props<{ comments: fromComment.AppMessage[] }>());
const PostReplyFailed = createAction(POST_REPLY_FAILED, props<{ error: HttpErrorResponse }>());


/* COMMENTS ACTIONS */
const PostCommentStart = createAction(POST_COMMENT_START, props<{ comment: fromComment.AppMessage }>());
const PostCommentSucceeded = createAction(POST_COMMENT_SUCCEEDED, props<{ comments: fromComment.AppMessage[] }>());
const PostCommentFailed = createAction(POST_COMMENT_FAILED, props<{ error: HttpErrorResponse }>());


const FetchOneCommentStart = createAction(FETCH_ONE_COMMENT_START, props<{ fromId: number }>());
const FetchOneCommentSucceeded = createAction(FETCH_ONE_COMMENT_SUCCEEDED, props<{ comment: Comment }>());
const FetchOneCommentFailed = createAction(FETCH_ONE_COMMENT_FAILED, props<{ error: HttpErrorResponse }>());

const FetchCommentsStart = createAction(FETCH_COMMENTS_START, props<{ suggestionId: number }>());
const FetchCommentsSucceeded = createAction(FETCH_COMMENTS_SUCCEEDED, props<{ comments: fromComment.AppMessage[] }>());
const FetchCommentsFailed = createAction(FETCH_COMMENTS_FAILED, props<{ error: HttpErrorResponse }>());


export const CommentActions = {
  FetchCommentsStart,
  FetchCommentsSucceeded,
  FetchCommentsFailed,
  FetchOneCommentStart,
  FetchOneCommentSucceeded,
  FetchOneCommentFailed,
  FetchRepliesStart,
  FetchRepliesSucceeded,
  FetchRepliesFailed,
  PostCommentStart,
  PostCommentSucceeded,
  PostCommentFailed,
  PostReplyStart,
  PostReplySucceeded,
  PostReplyFailed
};
