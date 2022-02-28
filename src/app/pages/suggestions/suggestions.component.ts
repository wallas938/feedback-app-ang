/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-suggestions',
  templateUrl: './suggestions.component.html',
  styleUrls: ['./suggestions.component.scss']
})
export class SuggestionsComponent implements OnInit {
  ngOnInit(): void {
  }

  suggestions: any = []
}
