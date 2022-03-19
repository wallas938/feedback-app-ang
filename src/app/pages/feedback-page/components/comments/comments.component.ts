/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromComment from 'store/reducers/comment.reducers';
import * as fromSuggestion from 'store/reducers/suggestions.reducers';
import * as fromApp from 'store/reducers';
@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent implements OnInit {

  @Input()
  comments: fromComment.AppMessage[];

  @Input()
  feedback: fromSuggestion.Suggestion;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {}

  getMessagesCount(): number | void {
    if(this.feedback) {
      return this.feedback?.numberOfComments;
    }
  }
}
