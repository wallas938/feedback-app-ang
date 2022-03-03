/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as fromSuggestion from 'store/reducers/suggestions.reducers';
import * as fadeAnimations from '@/app/shared/animations/fade';

@Component({
  selector: 'app-suggestion-item',
  templateUrl: './suggestion-item.component.html',
  styleUrls: ['./suggestion-item.component.scss'],
})
export class SuggestionItemComponent implements OnInit {

  @Input() public suggestion: fromSuggestion.Suggestion;

  constructor(private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  goFeedback(id: number) {
    this.router.navigate(['feedbacks', id])
  }

  getMessagesCount(comments: fromSuggestion.Comment[]): number {
    let globalMessageNumber = comments ? comments.length : 0;
    comments.map(comment => {
      globalMessageNumber += comment.replies ? comment.replies.length : 0;
    })
    return globalMessageNumber;
  }

}
