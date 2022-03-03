import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { Store } from '@ngrx/store';

import * as fadeAnimations from '@/app/shared/animations/fade';
import * as fromSuggestions from 'store/reducers/suggestions.reducers';
import * as fromApp from 'store/reducers';

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
  constructor(private route: ActivatedRoute,
    private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.store.select('suggestions').subscribe((state: fromSuggestions.State) => {
      this.editMode = state.formMode;
      this.isEditMode = this.setFormMode();
    })
    this.route.data
      .subscribe(
        (resolverData: Data) => {
          if (resolverData['feedback']) {
            this.feedback = resolverData['feedback'].payload;
          }
        }
      )
  }

  setFormMode(): boolean{
    switch (this.editMode) {
      case fromSuggestions.FORM_MODES.FORM_ADDING_MODE:
        return false;
      case fromSuggestions.FORM_MODES.FORM_EDITING_MODE:
        return true;
      default:
        return false;
    }
  }

}
