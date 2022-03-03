/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { Store } from '@ngrx/store';

import * as fromSuggestions from 'store/reducers/suggestions.reducers';
import * as fromSuggestionsActions from 'store/actions/suggestions.action';
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
  comments: fromSuggestions.Comment[];

  constructor(private router: Router,
    private store: Store<fromApp.AppState>,
    private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.route.data
      .subscribe(
        (resolverData: Data) => { this.feedback = resolverData['feedback'].payload;}
      )
  }

  navigateToForm() {
    this.store.dispatch(new fromSuggestionsActions.FormEditingMode())
    this.router.navigate(['/feedbacks/edit-feedback/', this.feedback.id])
  }
}
