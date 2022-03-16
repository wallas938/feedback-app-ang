import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromComment from 'store/reducers/comment.reducers';
import * as fromApp from 'store/reducers/index';

@Injectable({
  providedIn: 'root'
})
export class ReplyService {

  private replyUrl = 'http://localhost:3000/replies';

  constructor(private http: HttpClient,
    private store: Store<fromApp.AppState>) { }

    fetchOneSuggestionReplies(commentId: number): Observable<fromComment.AppMessage[]> {
      return this.http.get<fromComment.AppMessage[]>(`${this.replyUrl}?commentId=${commentId}`)
    }
}
