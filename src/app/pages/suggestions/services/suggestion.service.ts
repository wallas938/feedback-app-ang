import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import * as fromSuggestions from 'store/reducers/suggestions.reducers';
import * as fromComments from 'store/reducers/comment.reducers';
import * as fromApp from 'store/reducers/index';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SuggestionService {

  private suggestionsUrl = environment.apiURL+'/suggestions';

  constructor(private http: HttpClient, private store: Store<fromApp.AppState>) { }


  fetchSuggestions(query: fromSuggestions.SuggestionsQuery): Observable<fromSuggestions.Suggestion[]> {
    return this.filterByCategory(query._filter)
      .pipe(
        map((filteredSuggestions: fromSuggestions.Suggestion[]) => {
          return this.sortBy(filteredSuggestions, query._sort)
        })
      );
  }

  fetchSuggestion(id: number): Observable<fromSuggestions.Suggestion> {
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

  decrementSuggestionUpvotes(data: fromSuggestions.Suggestion): Observable<fromSuggestions.Suggestion> {
    const update = {
      ...data,
      upvotes: data.upvotes - 1
    }
    return this.http.put<fromSuggestions.Suggestion>(`${this.suggestionsUrl}/${data.id}`, update, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  postOneSuggestion(data: fromSuggestions.Suggestion): Observable<fromSuggestions.Suggestion> {
    return this.http.post<fromSuggestions.Suggestion>(`${this.suggestionsUrl}`,
      data,
      {
        headers: { 'Content-Type': 'application/json' }
      }
    )
  }

  postOneComment(suggestionId: number, comment: fromComments.AppMessage): Observable<fromSuggestions.Suggestion> {
    return this.http.post<fromSuggestions.Suggestion>(`${this.suggestionsUrl}/${suggestionId}/comments`,
      comment,
      {
        headers: { 'Content-Type': 'application/json' }
      }
    )
  }

  updateOneSuggestion(data: fromSuggestions.Suggestion, suggestionId: number): Observable<fromSuggestions.Suggestion> {
    return this.http.put<fromSuggestions.Suggestion>(`${this.suggestionsUrl}/${suggestionId}`,
      data,
      {
        headers: { 'Content-Type': 'application/json' }
      }
    )
  }

  deleteOneSuggestion(suggestionId: number): Observable<void> {
    return this.http.delete<void>(`${this.suggestionsUrl}/${suggestionId}`);
  }

  incrementSuggestionNumberOfComments(data: fromSuggestions.Suggestion): Observable<fromSuggestions.Suggestion> {
    return this.http.put<fromSuggestions.Suggestion>(`${this.suggestionsUrl}/${data.id}`,
      data,
      {
        headers: { 'Content-Type': 'application/json' }
      }
    )
  }

  private filterByCategory(filter: fromSuggestions.FILTER): Observable<fromSuggestions.Suggestion[]> {
    let filterBy = '?category=';
    switch (filter) {
      case fromSuggestions.FILTER.BY_ALL:
        filterBy = ''
        break;
      case fromSuggestions.FILTER.BY_BUG:
        filterBy = filterBy + 'Bug'
        break;
      case fromSuggestions.FILTER.BY_ENHANCEMENT:
        filterBy = filterBy + 'Enhancement'
        break;
      case fromSuggestions.FILTER.BY_FEATURE:
        filterBy = filterBy + 'Feature'
        break;
      case fromSuggestions.FILTER.BY_UI:
        filterBy = filterBy + 'UI'
        break;
      case fromSuggestions.FILTER.BY_UX:
        filterBy = filterBy + 'UX'
        break;
      default:
        filterBy = filterBy + ''
        break;
    }
    return this.http.get<fromSuggestions.Suggestion[]>(`${this.suggestionsUrl}${filterBy}`)
  }

  private sortBy(suggestions: fromSuggestions.Suggestion[], sort: fromSuggestions.SORT): fromSuggestions.Suggestion[] {
    switch (sort) {
      case fromSuggestions.SORT.MOST_UPVOTES:
        return suggestions.sort((a: fromSuggestions.Suggestion, b: fromSuggestions.Suggestion) => b.upvotes - a.upvotes);
        case fromSuggestions.SORT.LEAST_UPVOTES:
        return suggestions.sort((a: fromSuggestions.Suggestion, b: fromSuggestions.Suggestion) => a.upvotes - b.upvotes);
      case fromSuggestions.SORT.MOST_COMMENTS:
        return suggestions.sort((a: fromSuggestions.Suggestion, b: fromSuggestions.Suggestion) => b.numberOfComments - a.numberOfComments);
        case fromSuggestions.SORT.LEAST_COMMENTS:
        return suggestions.sort((a: fromSuggestions.Suggestion, b: fromSuggestions.Suggestion) => a.numberOfComments - b.numberOfComments);
      default:
        return suggestions.sort((a: fromSuggestions.Suggestion, b: fromSuggestions.Suggestion) => b.upvotes - a.upvotes);
    }

  }
}
