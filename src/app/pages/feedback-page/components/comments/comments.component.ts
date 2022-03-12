/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, Input, OnInit } from '@angular/core';
import * as fromSuggestions from 'store/reducers/suggestions.reducers';
import * as fromComments from 'store/reducers/comment.reducers';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent implements OnInit {

  @Input()
  comments: fromComments.Comment[];

  constructor() { }

  ngOnInit(): void {
  }

  getMessagesCount(comments: fromComments.Comment[]): number {
    /* let globalMessageNumber = comments ? comments.length : 0;
    comments.map(comment => {
      globalMessageNumber += comment.replies ? comment.replies.length : 0;
    }) */
    return 0;
  }
}
