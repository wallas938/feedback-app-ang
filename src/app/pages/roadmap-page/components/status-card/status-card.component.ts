/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-status-card',
  templateUrl: './status-card.component.html',
  styleUrls: ['./status-card.component.scss']
})
export class StatusCardComponent implements OnInit {

  @Input() suggestion!: any;

  constructor() { }

  ngOnInit(): void {
  }

  getMessagesCount(comments: any[]): number {
    if (comments) {
      let globalMessageNumber = comments ? comments.length : 0;
      comments.map(comment => {
        globalMessageNumber += comment.replies ? comment.replies.length : 0;
      })
      return globalMessageNumber;
    }
    return 0;
  }

}
