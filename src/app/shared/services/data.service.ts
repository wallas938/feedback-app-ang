import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public _jsonUrl = "assets/data.json";
  data: any = null;
  comments: any;
  constructor(private http: HttpClient) { }

  getJSON(): any {
    this.http.get(this._jsonUrl).subscribe(data => {
      this.data = data;
    })
  }

  getSuggestion(feedbackId: number) {
    this.http.get(this._jsonUrl).subscribe((data: any) => {
      this.data = data.productRequests
        .find((suggestion: any) => suggestion.id === feedbackId);
      this.comments = this.data.comments;
    })
  }
}
