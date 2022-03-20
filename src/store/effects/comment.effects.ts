import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { catchError, EMPTY, map, of, switchMap, tap } from "rxjs";

import * as fromCommentActions from "store/actions/comment.action";
import * as fromRouterActions from "store/actions/router.actions";
import * as fromSuggestionActions from "store/actions/suggestions.action";
import * as fromApp from "store/reducers/index";
import * as fromComment from "store/reducers/comment.reducers";
import * as fromSuggestion from "store/reducers/suggestions.reducers";
import { CommentService } from "@/app/shared/services/comment.service";
import { SuggestionService } from "@/app/pages/suggestions/services/suggestion.service";

@Injectable()
export class CommentEffects {
  suggestionId: number;
  suggestion: fromSuggestion.Suggestion;
  constructor(private actions$: Actions,
    private commentService: CommentService,
    private suggestionService: SuggestionService,
    private store: Store<fromApp.AppState>) { }

  fetchComments$ = createEffect(() => this.actions$.pipe(
    ofType(fromCommentActions.FETCH_COMMENTS_START),
    switchMap(({ suggestionId }: fromCommentActions.FetchCommentsStart) => {
      this.suggestionId = suggestionId;
      return this.commentService.fetchOneSuggestionComments(suggestionId)
        .pipe(switchMap((comments: fromComment.AppMessage[]) => {
          this.store.dispatch(new fromCommentActions.FetchCommentsSucceeded(comments));
          return of()
        }),
          catchError((error: HttpErrorResponse) => of(new fromCommentActions.FetchCommentsFailed(error))))
    })
  ));

  postComment$ = createEffect(() => this.actions$.pipe(
    ofType(fromCommentActions.POST_COMMENT_START),
    switchMap(({ comment }: fromCommentActions.PostCommentStart) => {
      return this.commentService.postOneComment(comment)
        .pipe(
          switchMap((comment: fromComment.AppMessage) => {
            return this.suggestionService.fetchSuggestion(comment.suggestionId)
              .pipe(tap((suggestion: fromSuggestion.Suggestion) => this.suggestion = suggestion),
                switchMap((suggestion: fromSuggestion.Suggestion) => of(suggestion)))
          }),
          switchMap((suggestion: fromSuggestion.Suggestion) => {
            this.store.dispatch(new fromSuggestionActions.IncrementNumberOfCommentsStart({...this.suggestion, numberOfComments: this.suggestion.numberOfComments + 1}))
            this.store.dispatch(new fromCommentActions.FetchCommentsStart(suggestion.id))
            return EMPTY
          }),
          catchError((error: HttpErrorResponse) => of(new fromCommentActions.PostCommentFailed(error))))
    })
  ));

  postReply$ = createEffect(() => this.actions$.pipe(
    ofType(fromCommentActions.POST_REPLY_START),
    switchMap(({ reply }: fromCommentActions.PostReplyStart) => {

      return this.commentService.postReply(reply).pipe(
        switchMap((reply: fromComment.AppMessage) => {
          return this.suggestionService.fetchSuggestion(reply.suggestionId)
            .pipe(tap((suggestion: fromSuggestion.Suggestion) => this.suggestion = suggestion),
              switchMap((suggestion: fromSuggestion.Suggestion) => of(suggestion)))
        }),
        switchMap((suggestion: fromSuggestion.Suggestion) => {
          this.store.dispatch(new fromSuggestionActions.IncrementNumberOfCommentsStart({...this.suggestion, numberOfComments: this.suggestion.numberOfComments + 1}))
          this.store.dispatch(new fromCommentActions.FetchCommentsStart(suggestion.id))
          return EMPTY
        }),
        catchError((error: HttpErrorResponse) => of(new fromCommentActions.PostCommentFailed(error))))
    })
  ));
}
