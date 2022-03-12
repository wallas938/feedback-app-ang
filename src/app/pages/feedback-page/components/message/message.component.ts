/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, Input, OnInit } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import * as fadeAnimations from '@/app/shared/animations/fade';
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

  @Input() comment: any;
  @Input() isMain = false;
  state = "in";
  reply = false;

  constructor() { }

  ngOnInit(): void {
    console.log(this.comment);
  }

  onReply() {
    this.reply = !this.reply;
  }

}
