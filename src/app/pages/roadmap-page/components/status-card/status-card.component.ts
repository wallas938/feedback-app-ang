/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromApp from 'store/reducers/index';
import * as fromSuggestions from 'store/reducers/suggestions.reducers';
import { SuggestionActions } from 'store/actions/suggestions.action';

@Component({
  selector: 'app-status-card',
  templateUrl: './status-card.component.html',
  styleUrls: ['./status-card.component.scss']
})
export class StatusCardComponent implements OnInit {

  @Input() suggestion!: fromSuggestions.Suggestion;
  isUpvoted: boolean;
  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.store.select('suggestions').subscribe((state: fromSuggestions.State) => {
      this.isUpvoted = state.suggestionsUpvoted.includes(this.suggestion.id);
    })
  }

  getMessagesCount(): number {
    return this.suggestion.numberOfComments;
  }

  onIncrement() {
    this.store.dispatch(SuggestionActions.IncrementUpvotesStart({ suggestion: this.suggestion }))
  }

  onDecrement() {
    this.store.dispatch(SuggestionActions.DecrementUpvotesStart({ suggestion: this.suggestion }))
  }

}
