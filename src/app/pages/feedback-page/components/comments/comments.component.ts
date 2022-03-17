/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from 'store/reducers/index';
import * as fromComment from 'store/reducers/comment.reducers';
import * as fromUser from 'store/reducers/user.reducers';
import * as fromCommentActions from 'store/actions/comment.action';
import * as fromUserActions from 'store/actions/user.actions';
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
  currentUser: User;
  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.store.select('user').subscribe((state: fromUser.State) => {
      this.currentUser = state.currentUser;
      if (!this.currentUser) {
        this.store.dispatch(new fromUserActions.FetchUserSucceeded(Math.floor(Math.random() * 11) + 1))
      }
    })
  }

  onReply(data: ReplyData) {
    const reply: fromComment.AppMessage = {
      content: data.message,
      from: this.currentUser.id,
      main: false,
      suggestionId: data.suggestionId,
      user: this.currentUser,
      mainId: data.mainId,
      replyingTo: data.replyingTo
    }
    this.store.dispatch(new fromCommentActions.PostReplyStart(reply))
  }

  getMessagesCount(): number {
    return 0 /* this.comments.length + this.replies.length */;
  }
}
