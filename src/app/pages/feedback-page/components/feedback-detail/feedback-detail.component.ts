/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';

import * as fromUser from 'store/reducers/user.reducers';
import * as fromComment from 'store/reducers/comment.reducers';
import * as fromSuggestions from 'store/reducers/suggestions.reducers';
import * as fromCommentActions from 'store/actions/comment.action';
import * as fromUserActions from "store/actions/user.actions";
import * as fromSuggestionActions from 'store/actions/suggestions.action';
import * as fromApp from 'store/reducers';
import * as fadeAnimations from '@shared/animations/fade';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-feedback-detail',
  templateUrl: './feedback-detail.component.html',
  styleUrls: ['./feedback-detail.component.scss'],
  animations: [fadeAnimations.fadeInOutY, fadeAnimations.fadeInOutX]
})
export class FeedbackDetailComponent implements OnInit {

  feedback: fromSuggestions.Suggestion;
  feedbackId: number;
  isUpvoted: boolean;
  comments: fromComment.AppMessage[];
  replies: fromComment.AppMessage[];
  currentUser: fromUser.User;
  charactersLeft = 250;
  maxCharacters = 250;

  form: FormGroup = this.fb.group({
    comment: ['', Validators.maxLength(250)]
  })

  @ViewChild('commentField') commentField: ElementRef;



  constructor(private router: Router,
    private store: Store<fromApp.AppState>,
    private route: ActivatedRoute,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.feedbackId = this.route.snapshot.params['id'];
    this.store.dispatch(new fromSuggestionActions.FetchOneSuggestionStart(this.feedbackId));
    this.store.dispatch(new fromCommentActions.FetchCommentsStart(this.feedbackId));


    this.store.select('comment').subscribe(((state: fromComment.State) => {
      this.comments = state.comments;
      /* this.isUpvoted = state.suggestionsUpvoted.includes(state.suggestion?.id); */
    }));

    this.store.select('user').subscribe(((state: fromUser.State) => {
      this.currentUser = state.currentUser;
      if (!this.currentUser) {
        this.store.dispatch(new fromUserActions.FetchUserSucceeded(Math.floor(Math.random() * 11) + 1))
      }
      /* this.isUpvoted = state.suggestionsUpvoted.includes(state.suggestion?.id); */
    }));

    this.store.select('suggestions').subscribe(((state: fromSuggestions.State) => {
      this.feedback = state.suggestion;
      this.isUpvoted = state.suggestionsUpvoted.includes(state.suggestion?.id);
    }));


    this.form.get('comment').valueChanges.subscribe((value) => {
      this.charactersLeft = this.maxCharacters - value.length;
      if (this.charactersLeft <= 0) {
        this.charactersLeft = 0;
      }
    });
  }

  navigateToForm() {
    this.store.dispatch(new fromSuggestionActions.FormEditingMode())
    this.router.navigate(['/feedbacks/edit-feedback/', this.feedbackId])
  }

  onSubmit() {
    const comment: fromComment.AppMessage = {
      content: this.form.get('comment').value,
      from: this.currentUser.id,
      suggestionId: this.feedbackId,
      user: this.currentUser,
      replies: [],
      main: true
    };

    this.store.dispatch(new fromSuggestionActions.PostOneCommentStart(this.feedback.id, comment))
  }
}
