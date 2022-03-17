/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromComment from 'store/reducers/comment.reducers';

import { ReplyData } from '../../models/reply-data';
import { User } from 'store/reducers/user.reducers';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent implements OnInit {

  @Input()
  comments: fromComment.AppMessage[];
  constructor() { }

  ngOnInit(): void {

  }

  getMessagesCount(): number {
    return 0 /* this.comments.length + this.replies.length */;
  }
}
