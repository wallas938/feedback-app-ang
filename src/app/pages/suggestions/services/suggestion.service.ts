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

  fetchSuggestions(filterBy: fromSuggestions.FILTER): Observable<fromSuggestions.Suggestion[]> {
    this.setRequestQueries(filterBy)
    return this.http.get<fromSuggestions.Suggestion[]>(`${this.suggestionsUrl}?_sort=${this.setRequestQueries(filterBy)._sort}&_order=${this.setRequestQueries(filterBy)._order}`);
  }

  fetchSuggestion(id: string): Observable<fromSuggestions.Suggestion> {
    return this.http.get<fromSuggestions.Suggestion>(`${this.suggestionsUrl}/${id}`)
  }

  setRequestQueries(filterBy: fromSuggestions.FILTER): { _sort: string, _order: string } {
    const filter = filterBy.toString().toLowerCase().split(' ');
    const sortBy = filter[1] === 'comments' ? 'comments.length,comments.replies.length' : filter[1];
    let order;

    switch (filter[0]) {
      case 'most':
        order = filter[1] === 'comments' ? 'desc,desc' : 'desc';
        break;
      case 'least':
        order = filter[1] === 'comments' ? 'asc,asc' : 'asc';
        break;

      default:
        order = filter[1] === 'comments' ? 'desc,desc' : 'desc';
        break;
    }
    return {
      _sort: sortBy,
      _order: order
    }
  }
}
