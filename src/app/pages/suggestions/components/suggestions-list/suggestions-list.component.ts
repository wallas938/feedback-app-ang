/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-suggestions-list',
  templateUrl: './suggestions-list.component.html',
  styleUrls: ['./suggestions-list.component.scss']
})
export class SuggestionsListComponent implements OnInit {

  @Input() public suggestions: any = [];

  constructor() { }

  ngOnInit(): void {
    console.log(this.suggestions);
  }

  getMessagesCount(comments: any[]): number {
    let globalMessageNumber = comments ? comments.length : 0;
    comments.map(comment => {
      globalMessageNumber += comment.replies ? comment.replies.length : 0;
    })
    return globalMessageNumber;
  }

}
