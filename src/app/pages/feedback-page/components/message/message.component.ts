/* eslint-disable @typescript-eslint/no-empty-function */
import { Component,Input, OnInit} from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import * as fromComment from 'store/reducers/comment.reducers';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import * as fromApp from 'store/reducers/index';
import * as fromUser from 'store/reducers/user.reducers';
import * as fromSuggestion from 'store/reducers/suggestions.reducers';
import * as fromCommentActions from 'store/actions/comment.action';
import * as fromUserActions from 'store/actions/user.actions';
import * as fromSuggestionActions from 'store/actions/suggestions.action';
import { Store } from '@ngrx/store';
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
export class MessageComponent implements OnInit {

  @Input() feedback: fromSuggestion.Suggestion;
  @Input() comment: fromComment.AppMessage;
  @Input() isMain: boolean;
  currentUser: fromUser.User;

  /* @Output() reply: EventEmitter<ReplyData> = new EventEmitter<ReplyData>(); */
  state = "in";
  isFormDisplayed = false;
  message = new FormControl('', [
    Validators.minLength(3),
    Validators.maxLength(250)
  ]);

  constructor(private fb: FormBuilder, private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.store.select('user').subscribe((state: fromUser.State) => {
      this.currentUser = state.currentUser;
      if (!this.currentUser) {
        this.store.dispatch(new fromUserActions.FetchUserSucceeded(Math.floor(Math.random() * 11) + 1))
      }
    });
  }

  showForm() {
    /* console.log("This Comment ID: ", this.comment.id);
    console.log("Main Comment ID: ", this.comment.main ? this.comment.id : this.comment.mainId);
 */
    this.isFormDisplayed = !this.isFormDisplayed;
  }

  sendReply(replyingTo: string) {
    const reply: fromComment.AppMessage = {
      main: false,
      mainId: this.comment.main ? this.comment.id : this.comment.mainId,
      content: this.message.value,
      user: this.currentUser,
      from: this.currentUser.id,
      replyingTo: replyingTo,
      suggestionId: this.comment.suggestionId
    };
    this.store.dispatch(new fromCommentActions.PostReplyStart(reply));
    this.store.dispatch(new fromSuggestionActions.IncrementNumberOfCommentsStart({...this.feedback, numberOfComments: this.feedback.numberOfComments + 1}))
  }

}
