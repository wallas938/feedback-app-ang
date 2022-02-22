/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-suggestion-item',
  templateUrl: './suggestion-item.component.html',
  styleUrls: ['./suggestion-item.component.scss']
})
export class SuggestionItemComponent implements OnInit {

  @Input() public suggestion: any;

  constructor(private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  goFeedback(id: string) {
    this.router.navigate(['feedbacks', id])
  }

  getMessagesCount(comments: any[]): number {
    let globalMessageNumber = comments ? comments.length : 0;
    comments.map(comment => {
      globalMessageNumber += comment.replies ? comment.replies.length : 0;
    })
    return globalMessageNumber;
  }

}
