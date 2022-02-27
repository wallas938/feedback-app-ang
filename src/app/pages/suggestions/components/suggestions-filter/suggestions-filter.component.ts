/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnInit } from '@angular/core';

export enum Filter {
  MOST_UPVOTES = "Most Upvotes",
  LEAST_UPVOTES = "Least Upvotes",
  MOST_COMMENTS = "Most Comments",
  LEAST_COMMENTS = "Least Comments"
}

@Component({
  selector: 'app-suggestions-filter',
  templateUrl: './suggestions-filter.component.html',
  styleUrls: ['./suggestions-filter.component.scss']
})
export class SuggestionsFilterComponent implements OnInit {

  showFilter = false;
  currentFilter = Filter.MOST_UPVOTES
  constructor() { }

  ngOnInit(): void {
  }

  onShowFilter() {
    this.showFilter = !this.showFilter;
  }

  onSelectFilter(filter: string) {
    switch (filter) {
      case Filter.MOST_COMMENTS:
        this.currentFilter = Filter.MOST_COMMENTS;
        break;
      case Filter.LEAST_COMMENTS:
        this.currentFilter = Filter.LEAST_COMMENTS;
        break;
      case Filter.MOST_UPVOTES:
        this.currentFilter = Filter.MOST_UPVOTES;
        break;
      case Filter.LEAST_UPVOTES:
        this.currentFilter = Filter.LEAST_UPVOTES;
        break;
      default:
        this.currentFilter = Filter.MOST_COMMENTS;
        break;
    }
  }

}
