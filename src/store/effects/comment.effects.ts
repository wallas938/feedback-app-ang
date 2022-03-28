import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { catchError, EMPTY, map, of, switchMap, tap } from "rxjs";

import { CommentActions } from 'store/actions/comment.action';
import { suggestionActions } from "store/actions/suggestions.action";
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
    ofType(CommentActions.FetchCommentsStart),
    switchMap(({ suggestionId }) => {
      this.suggestionId = suggestionId;
      return this.commentService.fetchOneSuggestionComments(suggestionId)
        .pipe(switchMap((comments: fromComment.AppMessage[]) => {
          this.store.dispatch(CommentActions.FetchCommentsSucceeded({ comments: comments }));
          return of()
        }),
          catchError((error: HttpErrorResponse) => of(CommentActions.FetchCommentsFailed(error))))
    })
  ));

  postComment$ = createEffect(() => this.actions$.pipe(
    ofType(CommentActions.PostCommentStart),
    switchMap(({ comment }) => {
      return this.commentService.postOneComment(comment)
        .pipe(
          switchMap((comment: fromComment.AppMessage) => {
            return this.suggestionService.fetchSuggestion(comment.suggestionId)
              .pipe(tap((suggestion: fromSuggestion.Suggestion) => this.suggestion = suggestion),
                switchMap((suggestion: fromSuggestion.Suggestion) => of(suggestion)))
          }),
          switchMap((suggestion: fromSuggestion.Suggestion) => {
            /* this.store.dispatch(suggestionActions.IncrementNumberOfCommentsStart({...this.suggestion, numberOfComments: this.suggestion.numberOfComments + 1})) */
            this.store.dispatch(suggestionActions.IncrementNumberOfCommentsStart({ suggestion: { ...suggestion, numberOfComments: this.suggestion.numberOfComments + 1 } }));
            this.store.dispatch(CommentActions.FetchCommentsStart({ suggestionId: suggestion.id }))
            return EMPTY
          }),
          catchError((error: HttpErrorResponse) => of(CommentActions.PostCommentFailed(error))))
    })
  ));

  postReply$ = createEffect(() => this.actions$.pipe(
    ofType(CommentActions.PostReplyStart),
    switchMap(({ reply }) => {

      return this.commentService.postReply(reply).pipe(
        switchMap((reply: fromComment.AppMessage) => {
          return this.suggestionService.fetchSuggestion(reply.suggestionId)
            .pipe(tap((suggestion: fromSuggestion.Suggestion) => this.suggestion = suggestion),
              switchMap((suggestion: fromSuggestion.Suggestion) => of(suggestion)))
        }),
        switchMap((suggestion: fromSuggestion.Suggestion) => {
          this.store.dispatch(suggestionActions.IncrementNumberOfCommentsStart({ suggestion: { ...suggestion, numberOfComments: this.suggestion.numberOfComments + 1 } }))
          this.store.dispatch(CommentActions.FetchCommentsStart({ suggestionId: suggestion.id }))
          return EMPTY
        }),
        catchError((error: HttpErrorResponse) => of(CommentActions.PostCommentFailed(error))))
    })
  ));
}
