import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromSuggestions from 'store/reducers/suggestions.reducers';
import * as fromApp from 'store/reducers/index';

@Injectable({
  providedIn: 'root'
})
export class ReplyService {

  private commentsUrl = 'http://localhost:3000/replies';

  constructor(private http: HttpClient, private store: Store<fromApp.AppState>) { }
}
