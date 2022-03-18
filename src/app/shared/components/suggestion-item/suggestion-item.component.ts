/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import * as fromApp from 'store/reducers/index';
import * as fromSuggestions from 'store/reducers/suggestions.reducers';
import * as fromComment from 'store/reducers/comment.reducers';
import * as fromSuggestionActions from 'store/actions/suggestions.action';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-suggestion-item',
  templateUrl: './suggestion-item.component.html',
  styleUrls: ['./suggestion-item.component.scss'],
})
export class SuggestionItemComponent implements OnInit {

  @Input() public suggestion: fromSuggestions.Suggestion;
  @Input() public comments: fromComment.AppMessage[];
  @Input() public isUpvoted: boolean;

  constructor(private router: Router,
    private store: Store<fromApp.AppState>,
    private route: ActivatedRoute) {

  }

  ngOnInit(): void { }

  goFeedback(id: number) {
    this.router.navigate(['feedbacks', id])
  }

  onIncrement() {
    this.store.dispatch(new fromSuggestionActions.IncrementUpvotesStart(this.suggestion))
  }

  onDecrement() {
    this.store.dispatch(new fromSuggestionActions.DecrementUpvotesStart(this.suggestion))
  }

  getMessagesCount(): number {
    return this.suggestion.numberOfComments;
  }

}
