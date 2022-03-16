import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { concatMap, map, mergeAll, Observable, switchMap, toArray } from 'rxjs';
import * as fromComment from 'store/reducers/comment.reducers';
import * as fromApp from 'store/reducers/index';
import { ReplyService } from './reply.service';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private commentsUrl = 'http://localhost:3000/comments';
  comments: fromComment.AppMessage[] = [];
  replies: fromComment.AppMessage[] = [];
  /*
    comment: {
      message: ,
      replies: []
    }
  */

  constructor(private http: HttpClient, private store: Store<fromApp.AppState>, private replyService: ReplyService) { }

  fetchOneSuggestionComments(suggestionId: number): Observable<fromComment.AppMessage[]> {
    return this.http.get<fromComment.AppMessage[]>(`${this.commentsUrl}?suggestionId=${suggestionId}`)
      .pipe(switchMap((comments: fromComment.AppMessage[]) => {
        this.comments = comments;
        return comments.map((comment: fromComment.AppMessage) => comment.id)
      }),
        concatMap((commentId: number) => {
          return this.replyService.fetchOneSuggestionReplies(commentId)
        }),
        mergeAll(),
        toArray(),
        map((replies: fromComment.AppMessage[]) => {
          return this.comments.map((comment: fromComment.AppMessage) => ({
            ...comment,
            replies: replies.filter((reply: fromComment.AppMessage) => reply.commentId === comment.id)
          }))
        }
        ))
  }

  postOneComment(comment: fromComment.AppMessage): Observable<fromComment.AppMessage[]> {
    const header = { headers: { 'Content-Type': 'application/json' } };
    return this.http.post<fromComment.AppMessage>(`${this.commentsUrl}`, comment, header)
      .pipe(
        (map((comment: fromComment.AppMessage) => comment)),
        switchMap((comment: fromComment.AppMessage) => this.fetchOneSuggestionComments(comment.suggestionId)),
        map((comments: fromComment.AppMessage[]) => comments)
      )
  }
}
