import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';

import * as fadeAnimations from '@/app/shared/animations/fade';
import * as fromSuggestions from 'store/reducers/suggestions.reducers';
import * as fromRouter from 'store/reducers/router.reducers';
import * as fromSuggestionActions from 'store/actions/suggestions.action';
import * as fromRouterActions from 'store/actions/router.actions';
import * as fromApp from 'store/reducers';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-feedback-form',
  templateUrl: './feedback-form.component.html',
  styleUrls: ['./feedback-form.component.scss'],
  animations: fadeAnimations.fadeInOutY
})
export class FeedbackFormComponent implements OnInit {
  feedback: fromSuggestions.Suggestion;
  editMode: fromSuggestions.FORM_MODES = fromSuggestions.FORM_MODES.FORM_ADDING_MODE;
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
    this.store.select('suggestions').subscribe((state: fromSuggestions.State) => {
      this.editMode = state.formMode;
      this.isEditMode = this.setFormMode(state.formMode);
      this.feedback = state.suggestion;

      if (this.isEditMode) {
        this.initFormValues(state.suggestion);
      } else if (!this.isEditMode && this.router.url.includes('edit')) {
        this.router.navigate(['suggestions'])
      }
    });

    this.store.select('router').subscribe((state: fromRouter.State) => {
      if (state.toRedirect) {
        this.router.navigate([state.redirectTo, this.feedback.id]);
        this.store.dispatch(new fromRouterActions.RedirectTo(false, null));
      }
    })
  }

  initFormValues(suggestion: fromSuggestions.Suggestion) {
    this.form.patchValue({
      title: suggestion.title,
      detail: suggestion.description
    });
    this.selectedStatus = suggestion.status;
    this.selectedCategory = suggestion.category;
    this.upvotes = suggestion.upvotes;
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
    return `Editing '${this.feedback.title}'`
  }

  onSubmit() {
    if (this.form.valid) {
      const newSuggestions: fromSuggestions.Suggestion = {
        title: this.form.get('title').value,
        category: this.selectedCategory,
        status: this.selectedStatus ? this.selectedStatus : 'Suggestion',
        upvotes: this.upvotes ? this.upvotes : 0,
        description: this.form.get('detail').value,
        comments: []
      }

      if (this.isEditMode) {
        this.store.dispatch(new fromSuggestionActions.UpdateOneSuggestionStart(newSuggestions, this.feedback.id));
        return;
      }
      this.store.dispatch(new fromSuggestionActions.PostOneSuggestionStart(newSuggestions));
    }
  }
}
