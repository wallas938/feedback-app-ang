/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnInit } from '@angular/core';
import * as fadeAnimations from '@/app/shared/animations/fade';
import { Store } from '@ngrx/store';
import * as fromApp from 'store/reducers/index';
import * as fromSuggestions from 'store/reducers/suggestions.reducers';
import { suggestionActions } from 'store/actions/suggestions.action';
import { suggestionSelectors } from 'store/selectors/suggestion.selectors';


@Component({
  selector: 'app-roadmap',
  templateUrl: './roadmap.component.html',
  styleUrls: ['./roadmap.component.scss'],
  animations: [
    fadeAnimations.fadeInOutY,
    fadeAnimations.fadeInOutX
  ]
})
export class RoadmapComponent implements OnInit {

  data: fromSuggestions.Suggestion[];

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {

    this.store.select(suggestionSelectors.getSuggestions).subscribe((suggestions: fromSuggestions.Suggestion[]) => {
      this.data = suggestions;
    });
  }


  getPlannedSuggestions(): fromSuggestions.Suggestion[] {
    return this.data.filter((request: fromSuggestions.Suggestion) => request.status === 'planned');
  }
  getInProgressSuggestions(): fromSuggestions.Suggestion[] {
    return this.data.filter((request: fromSuggestions.Suggestion) => request.status === 'in-progress');
  }
  getLiveSuggestions(): fromSuggestions.Suggestion[] {
    return this.data.filter((request: fromSuggestions.Suggestion) => request.status === 'live');
  }

  getPlannedSuggestionsCount(): number {
    return this.data.filter((request: fromSuggestions.Suggestion) => request.status === 'planned').length;
  }
  getInProgressSuggestionsCount(): number {
    return this.data.filter((request: fromSuggestions.Suggestion) => request.status === 'in-progress').length;
  }
  getLiveSuggestionsCount(): number {
    return this.data.filter((request: fromSuggestions.Suggestion) => request.status === 'live').length;
  }
}
