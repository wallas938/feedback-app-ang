/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';

import * as fromSuggestions from 'store/reducers/suggestions.reducers';
import * as fromSuggestionActions from 'store/actions/suggestions.action';
import * as fromApp from 'store/reducers';
import * as fadeAnimations from '@shared/animations/fade';

@Component({
  selector: 'app-feedback-detail',
  templateUrl: './feedback-detail.component.html',
  styleUrls: ['./feedback-detail.component.scss'],
  animations: [fadeAnimations.fadeInOutY, fadeAnimations.fadeInOutX]
})
export class FeedbackDetailComponent implements OnInit {

  feedback: fromSuggestions.Suggestion;
  feedbackId: number;
  public isUpvoted: boolean;
  comments: fromSuggestions.Comment[];

  constructor(private router: Router,
    private store: Store<fromApp.AppState>,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.feedbackId = this.route.snapshot.params['id'];
    this.store.dispatch(new fromSuggestionActions.FetchOneSuggestionStart(this.feedbackId.toString()));
    this.store.select('suggestions').subscribe(((state: fromSuggestions.State) => {
      this.feedback = state.suggestion;
      this.isUpvoted = state.suggestionsUpvoted.includes(state.suggestion?.id);
    }));
  }

  navigateToForm() {
    this.store.dispatch(new fromSuggestionActions.FormEditingMode())
    this.router.navigate(['/feedbacks/edit-feedback/', this.feedbackId])
  }
}
