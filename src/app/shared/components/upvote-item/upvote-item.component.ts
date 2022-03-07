/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
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

  url: string;
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.url = this.router.url;
  }

  incrementUpvotes() {
    !this.isUpvoted && this.increment.emit();
  }

}
