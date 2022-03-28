/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import * as fromComment from 'store/reducers/comment.reducers';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import * as fromApp from 'store/reducers/index';
import * as fromUser from 'store/reducers/user.reducers';
import * as fromSuggestion from 'store/reducers/suggestions.reducers';
import { UserActions } from "store/actions/user.actions";
import { userSelectors } from "store/selectors/user.selectors";
import { CommentActions } from 'store/actions/comment.action';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
  animations: [
    trigger('reply-form-animation', [
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'translateY(-20px)',
        }),
        animate(400)
      ]),
      transition('* => void', [
        animate(250, style({
          opacity: 0,
          transform: 'translateY(-30px)',
        }))
      ]),
    ])
  ]
})
export class MessageComponent implements OnInit, OnDestroy {

  @Input() feedback: fromSuggestion.Suggestion;
  @Input() isLastComment: boolean;
  @Input() comment: fromComment.AppMessage;
  @Input() isMain: boolean;
  currentUser: fromUser.User;
  allSubscriptions = new Subscription();

  /* @Output() reply: EventEmitter<ReplyData> = new EventEmitter<ReplyData>(); */
  state = "in";
  isFormDisplayed = false;
  message = new FormControl('', [
    Validators.minLength(3),
    Validators.maxLength(250)
  ]);

  constructor(private fb: FormBuilder, private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.allSubscriptions.add(this.store.select(userSelectors.getCurrentUser).subscribe((currentUser: fromUser.User) => {
      this.currentUser = currentUser;
    }));
  }

  showForm() {
    this.isFormDisplayed = !this.isFormDisplayed;
  }

  sendReply(replyingTo: string) {
    if (this.message.value.trim() !== '' && this.message.valid && this.message.touched) {
      const reply: fromComment.AppMessage = {
        main: false,
        mainId: this.comment.main ? this.comment.id : this.comment.mainId,
        content: this.message.value,
        user: this.currentUser,
        from: this.currentUser.id,
        replyingTo: replyingTo,
        suggestionId: this.comment.suggestionId
      };
      this.store.dispatch(CommentActions.PostReplyStart({ reply: reply }));
    }
  }

  ngOnDestroy(): void {
    this.allSubscriptions.unsubscribe();
  }
}
