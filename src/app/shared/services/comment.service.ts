import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromSuggestion from 'store/reducers/suggestions.reducers';
import * as fromComment from 'store/reducers/comment.reducers';
import * as fromApp from 'store/reducers/index';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private commentsUrl = 'http://localhost:3000/comments';

  constructor(private http: HttpClient, private store: Store<fromApp.AppState>) { }

  fetchOneSuggestionComments(suggestionId: number): Observable<fromComment.Comment[]> {
    console.log(suggestionId);
    return this.http.get<fromComment.Comment[]>(`${this.commentsUrl}?suggestionId=${suggestionId}`)
  }
}
