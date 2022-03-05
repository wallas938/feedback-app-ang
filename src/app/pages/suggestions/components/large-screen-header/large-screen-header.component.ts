/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnInit } from '@angular/core';
import * as fromSuggestions from 'store/reducers/suggestions.reducers';
import * as fromApp from 'store/reducers/index';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
@Component({
  selector: 'app-large-screen-header',
  templateUrl: './large-screen-header.component.html',
  styleUrls: ['./large-screen-header.component.scss']
})
export class LargeScreenHeaderComponent implements OnInit {

  currentFilterValue: fromSuggestions.FILTER;
  public categories: string[] = ["All", "UI", "UX", "Enhancement", "Bug", "Feature"];

  constructor(private store: Store<fromApp.AppState>, private router: Router) { }

  ngOnInit(): void {
    this.store.select('suggestions').subscribe(
      (state: fromSuggestions.State) => {
        this.currentFilterValue = state.filterBy;
      })
  }

}
