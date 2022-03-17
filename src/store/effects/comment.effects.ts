import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { catchError, EMPTY, map, of, switchMap } from "rxjs";

import * as fromCommentActions from "store/actions/comment.action";
import * as fromRouterActions from "store/actions/router.actions";
import * as fromApp from "store/reducers/index";
import * as fromComment from "store/reducers/comment.reducers";
import { CommentService } from "@/app/shared/services/comment.service";

@Injectable()
export class CommentEffects {
  suggestionId: number;
  constructor(private actions$: Actions,
    private commentService: CommentService,
    private store: Store<fromApp.AppState>) { }

  fetchComments$ = createEffect(() => this.actions$.pipe(
    ofType(fromCommentActions.FETCH_COMMENTS_START),
    switchMap(({ suggestionId }: fromCommentActions.FetchCommentsStart) => {
      this.suggestionId = suggestionId;
      return this.commentService.fetchOneSuggestionComments(suggestionId)
        .pipe(switchMap((comments: fromComment.AppMessage[]) => {
          const redirectTo = `feedbacks/${this.suggestionId}`
          this.store.dispatch(new fromCommentActions.FetchCommentsSucceeded(comments));
          this.store.dispatch(new fromRouterActions.RedirectTo(true, redirectTo));
          return of()
        }),
          catchError((error: HttpErrorResponse) => of(new fromCommentActions.FetchCommentsFailed(error))))
    })
  ));

  postComment$ = createEffect(() => this.actions$.pipe(
    ofType(fromCommentActions.POST_COMMENT_START),
    switchMap(({ comment }: fromCommentActions.PostCommentStart) => {
      return this.commentService.postOneComment(comment)
        .pipe(switchMap((comment: fromComment.AppMessage) => {
          this.store.dispatch(new fromCommentActions.FetchCommentsStart(comment.suggestionId))
          return EMPTY
        }),
          catchError((error: HttpErrorResponse) => of(new fromCommentActions.PostCommentFailed(error))))
    })
  ));

  postReply$ = createEffect(() => this.actions$.pipe(
    ofType(fromCommentActions.POST_REPLY_START),
    switchMap(({ reply }: fromCommentActions.PostReplyStart) => this.commentService.postReply(reply)),
    switchMap((reply: fromComment.AppMessage) => {
      this.store.dispatch(new fromCommentActions.FetchCommentsStart(reply.suggestionId));
      return EMPTY
    }),
    catchError((error) => of(error)))
  );
}
