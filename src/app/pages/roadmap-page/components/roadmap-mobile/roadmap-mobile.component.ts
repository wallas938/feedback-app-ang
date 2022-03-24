/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromApp from 'store/reducers/index';
import * as fromSuggestions from 'store/reducers/suggestions.reducers';
import { SuggestionActions } from 'store/actions/suggestions.action';
import { LayoutActions } from 'store/actions/layout.action';
import { suggestionSelectors } from 'store/selectors/suggestion.selectors';
import { layoutSelectors } from "store/selectors/layout.selectors";
import * as fadeAnimations from '@/app/shared/animations/fade';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-roadmap-mobile',
  templateUrl: './roadmap-mobile.component.html',
  styleUrls: ['./roadmap-mobile.component.scss'],
  animations: [
    fadeAnimations.fadeInOutY,
    fadeAnimations.fadeInOutX
  ]
})
export class RoadmapMobileComponent implements OnInit, OnDestroy {

  suggestions: fromSuggestions.Suggestion[];
  suggestionsSubscription: Subscription;
  toDisplay: fromSuggestions.Suggestion[] = [];
  currentTab!: fromSuggestions.STATUS;
  statusCount!: string;
  statusText!: string;
  plannedCount!: number;
  inProgressCount!: number;
  liveCount!: number;
  live = fromSuggestions.STATUS.LIVE;
  inProgress = fromSuggestions.STATUS.IN_PROGRESS;
  planned = fromSuggestions.STATUS.PLANNED;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {

    this.suggestionsSubscription = this.store.select(suggestionSelectors.getSuggestions).subscribe((suggestions: fromSuggestions.Suggestion[]) => {
      if (!suggestions || suggestions.length <= 0) {
        this.store.dispatch(SuggestionActions.FetchSuggestionsStart({ query: { _filter: fromSuggestions.FILTER.BY_ALL, _sort: fromSuggestions.SORT.MOST_UPVOTES } }));
      } else {
        this.suggestions = suggestions;
      }
    });

    this.store.select(layoutSelectors.getMobileRoadmapCurrentTab).subscribe((mobileRoadmapCurrentTab: fromSuggestions.STATUS) => {
      this.currentTab = mobileRoadmapCurrentTab;
      this.initData(this.currentTab);
    })
  }

  initData(tab: fromSuggestions.STATUS) {
    switch (tab) {
      case fromSuggestions.STATUS.IN_PROGRESS:
        this.displayInProgress();
        break;
      case fromSuggestions.STATUS.LIVE:
        this.displayLive();
        break;
      case fromSuggestions.STATUS.PLANNED:
        this.displayPlanned();
        break;

      default:
        this.displayInProgress();
        break;
    }
  }

  onSelectTab(tab: fromSuggestions.STATUS) {
    switch (tab) {
      case fromSuggestions.STATUS.PLANNED:
        this.store.dispatch(LayoutActions.MobileRoadMapTabChanged({ currentTab: fromSuggestions.STATUS.PLANNED }));
        this.displayPlanned();
        break;
      case fromSuggestions.STATUS.IN_PROGRESS:
        this.store.dispatch(LayoutActions.MobileRoadMapTabChanged({ currentTab: fromSuggestions.STATUS.IN_PROGRESS }));
        this.displayInProgress();
        break;
      case fromSuggestions.STATUS.LIVE:
        this.store.dispatch(LayoutActions.MobileRoadMapTabChanged({ currentTab: fromSuggestions.STATUS.LIVE }));
        this.displayLive();
        break;

      default:
        this.store.dispatch(LayoutActions.MobileRoadMapTabChanged({ currentTab: fromSuggestions.STATUS.IN_PROGRESS }));
        this.displayInProgress();
        break;
    }
  }

  displayPlanned() {
    this.toDisplay = this.suggestions?.filter((request: fromSuggestions.Suggestion) => request.status === 'planned');
    this.statusCount = `Planned ${this.getPlannedCount()}`;
    this.statusText = 'Ideas prioritized for research';
  }
  displayInProgress() {
    this.toDisplay = this.suggestions?.filter((request: fromSuggestions.Suggestion) => request.status === 'in-progress');
    this.statusCount = `In-Progress ${this.getInProgressCount()}`;
    this.statusText = 'Currently being developed';
  }
  displayLive() {
    this.toDisplay = this.suggestions?.filter((request: fromSuggestions.Suggestion) => request.status === 'live');
    this.statusCount = `Live ${this.getLiveCount()}`;
    this.statusText = 'Released features';
  }
  getPlannedCount(): number {
    return this.suggestions?.filter((request: fromSuggestions.Suggestion) => request.status === 'planned').length;

  }
  getInProgressCount(): number {
    return this.suggestions?.filter((request: fromSuggestions.Suggestion) => request.status === 'in-progress').length;

  }
  getLiveCount(): number {
    return this.suggestions?.filter((request: fromSuggestions.Suggestion) => request.status === 'live').length;
  }

  ngOnDestroy(): void {
    this.suggestionsSubscription.unsubscribe();
  }
}
