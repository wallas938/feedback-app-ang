/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-large-screen-header',
  templateUrl: './large-screen-header.component.html',
  styleUrls: ['./large-screen-header.component.scss']
})
export class LargeScreenHeaderComponent implements OnInit {

  public categories: string[] = ["All", "UI", "UX", "Enhancement", "Bug", "Feature"];

  constructor() { }

  ngOnInit(): void {
  }

}
