/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';


@Component({
  selector: 'app-upvote-item',
  templateUrl: './upvote-item.component.html',
  styleUrls: ['./upvote-item.component.scss']
})
export class UpvoteItemComponent implements OnInit {

  @Input()
  upvotes!: number;

  @Input()
  isUpvoted!: boolean;

  @Output()
  increment = new EventEmitter<void>()
  constructor() { }

  ngOnInit(): void { }

  incrementUpvotes() {
    !this.isUpvoted && this.increment.emit();
  }

}
