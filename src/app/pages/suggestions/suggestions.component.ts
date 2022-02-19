/* eslint-disable @typescript-eslint/no-empty-function */
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-suggestions',
  templateUrl: './suggestions.component.html',
  styleUrls: ['./suggestions.component.scss']
})
export class SuggestionsComponent implements OnInit {

  public _jsonUrl = "assets/data.json";
  data: any = null

  constructor(private http: HttpClient) { }

  ngOnInit(): void {

    this.http.get(this._jsonUrl).subscribe(data => {
      this.data = data;
    })
  }

}
