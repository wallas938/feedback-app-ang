/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromApp from 'store/reducers/index';
import * as fromSuggestions from 'store/reducers/suggestions.reducers';
import * as fromSuggestionActions from 'store/actions/suggestions.action';
import * as fadeAnimations from '@/app/shared/animations/fade';

@Component({
  selector: 'app-roadmap-mobile',
  templateUrl: './roadmap-mobile.component.html',
  styleUrls: ['./roadmap-mobile.component.scss'],
  animations: [
    fadeAnimations.fadeInOutY,
    fadeAnimations.fadeInOutX
  ]
})
export class RoadmapMobileComponent implements OnInit {

  data: fromSuggestions.Suggestion[];
  toDisplay: fromSuggestions.Suggestion[] = [];
  currentTab!: string;
  statusCount!: string;
  statusText!: string;
  plannedCount!: number;
  inProgressCount!: number;
  liveCount!: number;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.store.select('suggestions').subscribe((state: fromSuggestions.State) => {
      if (!state.sortBy) {
        this.store.dispatch(new fromSuggestionActions.FetchSuggestionsStart({ _filter: fromSuggestions.FILTER.BY_ALL, _sort: fromSuggestions.SORT.MOST_UPVOTES }))
        this.data = state.suggestions;
        this.displayInProgress('in-progress');
      } else {
        this.data = state.suggestions;
        this.displayInProgress('in-progress');
      }
    });
  }

  displayPlanned(currentTab: string) {
    this.toDisplay = this.data.filter((request: fromSuggestions.Suggestion) => request.status === 'planned');
    this.statusCount = `Planned ${this.getPlannedCount()}`;
    this.statusText = 'Ideas prioritized for research';
    this.currentTab = currentTab;
  }

  displayInProgress(currentTab: string) {
    this.toDisplay = this.data.filter((request: fromSuggestions.Suggestion) => request.status === 'in-progress');
    this.statusCount = `In-Progress ${this.getInProgressCount()}`;
    this.statusText = 'Currently being developed';
    this.currentTab = currentTab;
  }

  displayLive(currentTab: string) {
    this.toDisplay = this.data.filter((request: fromSuggestions.Suggestion) => request.status === 'live');
    this.statusCount = `Live ${this.getLiveCount()}`;
    this.statusText = 'Released features';
    this.currentTab = currentTab;
  }

  getPlannedCount(): number {
    return this.data.filter((request: fromSuggestions.Suggestion) => request.status === 'planned').length;

  }
  getInProgressCount(): number {
    return this.data.filter((request: fromSuggestions.Suggestion) => request.status === 'in-progress').length;

  }
  getLiveCount(): number {
    return this.data.filter((request: fromSuggestions.Suggestion) => request.status === 'live').length;
  }

}
