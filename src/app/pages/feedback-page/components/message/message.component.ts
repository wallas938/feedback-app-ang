/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import * as fromComment from 'store/reducers/comment.reducers';
import { FormBuilder, Validators } from '@angular/forms';
import { ReplyData } from '../../models/reply-data';

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

  @Input() comment: fromComment.AppMessage;
  @Input() isMain: boolean;
  @Output() reply: EventEmitter<ReplyData> = new EventEmitter<ReplyData>();
  state = "in";
  isFormDisplayed = false;

  form = this.fb.group({
    message: ['', [
      Validators.minLength(3),
      Validators.maxLength(250)
    ]]
  })

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  showForm() {
    this.isFormDisplayed = !this.isFormDisplayed;
  }

  sendReply(replyingTo: string) {
    this.reply.emit({
      mainId: this.comment.main ? this.comment.id : this.comment.mainId,
      message: this.form.get('message').value,
      suggestionId: this.comment.suggestionId,
      replyingTo: replyingTo
    })
  }

}
