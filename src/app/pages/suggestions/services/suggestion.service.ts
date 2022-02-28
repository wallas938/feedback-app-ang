import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SuggestionService {
  private suggestionsUrl = 'http://localhost:3000/suggestions';

  constructor(private http: HttpClient) { }

  fetchSuggestions() {
    return this.http.get(`${this.suggestionsUrl}`);
  }
}
