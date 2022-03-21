import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { concatMap, map, mergeAll, Observable, switchMap, toArray } from 'rxjs';
import * as fromComment from 'store/reducers/comment.reducers';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private commentsUrl = environment.apiURL + '/comments';
  private replyUrl = environment.apiURL + '/replies';
  comments: fromComment.AppMessage[] = [];
  replies: fromComment.AppMessage[] = [];

  constructor(private http: HttpClient) { }

  fetchOneSuggestionComments(suggestionId: number): Observable<fromComment.AppMessage[]> {
    return this.http.get<fromComment.AppMessage[]>(`${this.commentsUrl}?suggestionId=${suggestionId}`)
      .pipe(switchMap((comments: fromComment.AppMessage[]) => {
        this.comments = comments;
        return comments.map((comment: fromComment.AppMessage) => comment.id)
      }),
        concatMap((mainId: number) => {
          return this.fetchOneSuggestionReplies(mainId)
        }),
        mergeAll(),
        toArray(),
        map((replies: fromComment.AppMessage[]) => {
          return this.comments.map((comment: fromComment.AppMessage) => ({
            ...comment,
            replies: replies.filter((reply: fromComment.AppMessage) => reply.mainId === comment.id)
          }))
        }
        ))
  }

  postOneComment(comment: fromComment.AppMessage): Observable<fromComment.AppMessage> {
    const header = { headers: { 'Content-Type': 'application/json' } };
    return this.http.post<fromComment.AppMessage>(`${this.commentsUrl}`, comment, header)
  }

  private fetchOneSuggestionReplies(mainId: number): Observable<fromComment.AppMessage[]> {
    return this.http.get<fromComment.AppMessage[]>(`${this.replyUrl}?mainId=${mainId}`)
  }

  postReply(reply: fromComment.AppMessage): Observable<fromComment.AppMessage> {
    const header = { headers: { 'Content-Type': 'application/json' } };
    return this.http.post<fromComment.AppMessage>(`${this.replyUrl}`, reply, header)
  }
}
