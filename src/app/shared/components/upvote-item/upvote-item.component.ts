/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-upvote-item',
  templateUrl: './upvote-item.component.html',
  styleUrls: ['./upvote-item.component.scss']
})
export class UpvoteItemComponent implements OnInit {

  @Input()
  upvotes!: number;
  constructor() { }

  ngOnInit(): void {
  }

}
