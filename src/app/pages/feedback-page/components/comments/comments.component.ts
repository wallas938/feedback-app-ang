/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, Input, OnInit } from '@angular/core';
import * as fromComment from 'store/reducers/comment.reducers';
import * as fromSuggestion from 'store/reducers/suggestions.reducers';

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

  constructor() { }

  ngOnInit(): void {
  }

  getMessagesCount(): number {
    return this.feedback.numberOfComments; /* this.comments.length + this.replies.length */
  }
}
