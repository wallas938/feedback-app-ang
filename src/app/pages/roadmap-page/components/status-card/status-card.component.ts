/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromApp from 'store/reducers/index';
import * as fromSuggestions from 'store/reducers/suggestions.reducers';
import * as fromSuggestionActions from 'store/actions/suggestions.action';

@Component({
  selector: 'app-status-card',
  templateUrl: './status-card.component.html',
  styleUrls: ['./status-card.component.scss']
})
export class StatusCardComponent implements OnInit {

  @Input() suggestion!: any;
  isUpvoted: boolean;
  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.store.select('suggestions').subscribe((state: fromSuggestions.State) => {
      this.isUpvoted =  state.suggestionsUpvoted.includes(this.suggestion.id);
    })
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

  onIncrement() {
    this.store.dispatch(new fromSuggestionActions.IncrementUpvotesStart(this.suggestion))
  }

  onDecrement() {
    this.store.dispatch(new fromSuggestionActions.DecrementUpvotesStart(this.suggestion))
  }

}
