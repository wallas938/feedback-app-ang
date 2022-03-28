/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromApp from 'store/reducers/index';
import * as fromSuggestions from 'store/reducers/suggestions.reducers';
import { suggestionActions } from 'store/actions/suggestions.action';
import { suggestionSelectors } from 'store/selectors/suggestion.selectors';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-status-card',
  templateUrl: './status-card.component.html',
  styleUrls: ['./status-card.component.scss']
})
export class StatusCardComponent implements OnInit, OnDestroy {

  @Input() suggestion!: fromSuggestions.Suggestion;
  isUpvoted: boolean;
  allSubscriptions = new Subscription();
  constructor(private store: Store<fromApp.AppState>) { }


  ngOnInit(): void {
    this.allSubscriptions.add(this.store.select(suggestionSelectors.getSuggestionsUpvoted).subscribe((ids: number[]) => {
      this.isUpvoted = ids.includes(this.suggestion.id);
    }))
  }

  getMessagesCount(): number {
    return this.suggestion.numberOfComments;
  }

  onIncrement() {
    this.store.dispatch(suggestionActions.IncrementUpvotesStart({ suggestion: this.suggestion }))
  }

  onDecrement() {
    this.store.dispatch(suggestionActions.DecrementUpvotesStart({ suggestion: this.suggestion }))
  }

  ngOnDestroy(): void {
    this.allSubscriptions.unsubscribe()
  }

}
