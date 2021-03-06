/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnDestroy, OnInit } from '@angular/core';
import * as fromSuggestions from 'store/reducers/suggestions.reducers';
import * as fromApp from 'store/reducers/index';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { LayoutActions } from 'store/actions/layout.action';
import { suggestionSelectors } from 'store/selectors/suggestion.selectors';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-mobile-side-nav',
  templateUrl: './mobile-side-nav.component.html',
  styleUrls: ['./mobile-side-nav.component.scss'],
  animations: [
    trigger('sideNavAnimation', [
      transition('void => *', [
        animate(400, keyframes([
          style({
            transform: 'translateX(180px)',
          }),
          style({
            transform: 'translateX(0px)',
          }),
        ]))
      ]),
    ]),
  ]
})
export class MobileSideNavComponent implements OnInit, OnDestroy {

  allSubscriptions = new Subscription();
  suggestions: fromSuggestions.Suggestion[];
  public categories: string[] = ["All", "UI", "UX", "Enhancement", "Bug", "Feature"];

  constructor(private store: Store<fromApp.AppState>, private router: Router) { }

  ngOnInit(): void {

    this.allSubscriptions.add(this.store.select(suggestionSelectors.getSuggestions).subscribe((suggestions: fromSuggestions.Suggestion[]) => {
      this.suggestions = suggestions
    }))
  }

  getPlannedSuggestionsCount(): number {
    return this.suggestions.filter((request: fromSuggestions.Suggestion) => request.status === 'planned').length;
  }
  getInProgressSuggestionsCount(): number {
    return this.suggestions.filter((request: fromSuggestions.Suggestion) => request.status === 'in-progress').length;
  }
  getLiveSuggestionsCount(): number {
    return this.suggestions.filter((request: fromSuggestions.Suggestion) => request.status === 'live').length;
  }

  navigateTo() {
    this.router.navigate(['/roadmap']);
    this.store.dispatch(LayoutActions.MobileMenuClosed())
  }

  ngOnDestroy(): void {
    this.allSubscriptions.unsubscribe();
  }

}
