import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';

import * as fadeAnimations from '@/app/shared/animations/fade';
import * as fromSuggestions from 'store/reducers/suggestions.reducers';
import * as fromUser from 'store/reducers/user.reducers';
import * as fromRouter from 'store/reducers/router.reducers';
import { suggestionActions } from 'store/actions/suggestions.action';
import { suggestionSelectors } from 'store/selectors/suggestion.selectors';
import { routerSelectors } from 'store/selectors/router.selectors';
import { userSelectors } from "store/selectors/user.selectors";
import { routerActions } from 'store/actions/router.actions';
import * as fromApp from 'store/reducers';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-feedback-form',
  templateUrl: './feedback-form.component.html',
  styleUrls: ['./feedback-form.component.scss'],
  animations: fadeAnimations.fadeInOutY
})
export class FeedbackFormComponent implements OnInit, OnDestroy {
  currentUser: fromUser.User;
  feedback: fromSuggestions.Suggestion;
  allSubscriptions = new Subscription();
  isEditMode = false;
  categories = ['Feature', 'UI', 'UX', 'Enhancement', 'Bug'];
  suggestionStatus = ['Planned', 'Suggestion', 'In-Progress', 'Live'];
  selectedCategory = 'Feature';
  selectedStatus = '';
  showCategories = false;
  showStatus = false;
  upvotes: number;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromApp.AppState>,
    private fb: FormBuilder) { }

  form: FormGroup = this.fb.group({
    title: ['', Validators.required],
    category: [this.selectedCategory],
    status: [this.selectedStatus],
    detail: ['', Validators.required]
  })

  ngOnInit(): void {

    this.allSubscriptions.add(this.store.select(suggestionSelectors.getSuggestion).subscribe((suggestion: fromSuggestions.Suggestion) => {
      this.feedback = suggestion
    }));

    this.allSubscriptions.add(this.store.select(suggestionSelectors.getFormMode).subscribe((currentFormMode: fromSuggestions.FORM_MODES) => {
      this.isEditMode = this.setFormMode(currentFormMode);
      if (this.isEditMode) {
        this.initFormValues(this.feedback);
      } else if (!this.isEditMode && this.router.url.includes('edit')) {
        this.router.navigate(['suggestions']);
      }
    }));

    this.store.select(userSelectors.getCurrentUser).subscribe((currentUser: fromUser.User) => {
      this.currentUser = currentUser;
    });

    this.store.select(routerSelectors.getGloabalState).subscribe((state: fromRouter.State) => {
      if (state.toRedirect) {
        this.store.dispatch(suggestionActions.FormAddingMode())
        this.router.navigate([state.redirectTo]);
        this.store.dispatch(routerActions.RedirectTo({ redirectTo: null, toRedirect: false }));
      }
    })
  }

  initFormValues(suggestion: fromSuggestions.Suggestion) {
    this.form.patchValue({
      title: suggestion?.title,
      detail: suggestion?.description
    });
    this.selectedStatus = suggestion?.status;
    this.selectedCategory = suggestion?.category;
    this.upvotes = suggestion?.upvotes;
  }

  setFormMode(formMode: fromSuggestions.FORM_MODES): boolean {
    switch (formMode) {
      case fromSuggestions.FORM_MODES.FORM_ADDING_MODE:

        return false;
      case fromSuggestions.FORM_MODES.FORM_EDITING_MODE:
        return true;
      default:
        return false;
    }
  }

  setCategory(category: string) {
    this.selectedCategory = category;
  }

  setStatus(status: string) {
    this.selectedStatus = status;
  }

  onToggleCategories() {
    this.showCategories = !this.showCategories;
  }

  onToggleStatus() {
    this.showStatus = !this.showStatus;
  }

  getTitle(): string {
    return `Editing '${this.feedback.title}'`;
  }

  onSubmit() {
    if (this.form.valid) {

      const newSuggestions: fromSuggestions.Suggestion = {
        title: this.form.get('title').value,
        category: this.selectedCategory,
        status: this.selectedStatus ? this.selectedStatus.toLowerCase() : 'suggestion',
        upvotes: this.upvotes ? this.upvotes : 0,
        description: this.form.get('detail').value,
        numberOfComments: 0
      };

      if (this.isEditMode) {
        this.store.dispatch(suggestionActions.UpdateOneSuggestionStart({ suggestionId: this.feedback.id, updatedSuggestion: newSuggestions }));
        return;
      }

      this.store.dispatch(suggestionActions.PostOneSuggestionStart({ suggestion: newSuggestions }));
    }
  }

  remove(suggestionId: number) {
    this.store.dispatch(suggestionActions.RemoveOneSuggestionStart({ suggestionId: suggestionId }));
  }

  ngOnDestroy(): void {
    this.allSubscriptions.unsubscribe();
  }
}
