import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromSuggestions from 'store/reducers/suggestions.reducers';
import * as fromApp from 'store/reducers/index';

@Injectable({
  providedIn: 'root'
})
export class SuggestionService {
  private suggestionsUrl = 'http://localhost:3000/suggestions';

  constructor(private http: HttpClient, private store: Store<fromApp.AppState>) { }

  fetchSuggestions(query: fromSuggestions.SuggestionsQuery): Observable<fromSuggestions.Suggestion[]> {
    this.setRequestQueries(query);
    return this.http.get<fromSuggestions.Suggestion[]>(`${this.suggestionsUrl}?${this.setRequestQueries(query)._filter}_sort=${this.setRequestQueries(query)._sort}&_order=${this.setRequestQueries(query)._order}`);
  }
  fetchSuggestion(id: string): Observable<fromSuggestions.Suggestion> {
    return this.http.get<fromSuggestions.Suggestion>(`${this.suggestionsUrl}/${id}`)
  }
  incrementSuggestionUpvotes(data: fromSuggestions.Suggestion): Observable<fromSuggestions.Suggestion> {
    const update = {
      ...data,
      upvotes: data.upvotes + 1
    }
    return this.http.put<fromSuggestions.Suggestion>(`${this.suggestionsUrl}/${data.id}`, update, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
  private setRequestQueries({ _filter, _sort }: fromSuggestions.SuggestionsQuery): { _sort: string, _order: string, _filter: string } {
    let order;
    let filter;
    let sortBy = null;
    if (!_filter || !_sort) {
      filter = '';
      sortBy = 'upvotes';
      order = 'desc';
    } else {
      const sortTab = _sort.toLowerCase().split(' ');
      sortBy = sortTab[1] === 'comments' ? 'comments.length,comments.replies.length' : sortTab[1];
      switch (sortTab[0]) {
        case 'most':
          order = sortTab[1] === 'comments' ? 'desc,desc' : 'desc';
          break;
        case 'least':
          order = sortTab[1] === 'comments' ? 'asc,asc' : 'asc';
          break;

        default:
          order = sortTab[1] === 'comments' ? 'desc,desc' : 'desc';
          break;
      }

      switch (_filter) {
        case fromSuggestions.FILTER.BY_ALL:
          filter = ''
          break;
        case fromSuggestions.FILTER.BY_BUG:
          filter = 'category=bug&'
          break;
        case fromSuggestions.FILTER.BY_ENHANCEMENT:
          filter = 'category=enhancement&'
          break;
        case fromSuggestions.FILTER.BY_FEATURE:
          filter = 'category=feature&'
          break;
        case fromSuggestions.FILTER.BY_UI:
          filter = 'category=ui&'
          break;
        case fromSuggestions.FILTER.BY_UX:
          filter = 'category=ux&'
          break;
        default:
          filter = ''
          break;
      }
    }


    return {
      _sort: sortBy,
      _order: order,
      _filter: filter
    }
  }
}
