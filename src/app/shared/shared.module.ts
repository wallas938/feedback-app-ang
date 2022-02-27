import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { SuggestionItemComponent } from './components/suggestion-item/suggestion-item.component';
import { CategoryChipsComponent } from './components/category-chips/category-chips.component';
import { CommonModule } from '@angular/common';
import { UpvoteItemComponent } from './components/upvote-item/upvote-item.component';
import { CommentsCountComponent } from './components/comments-count/comments-count.component';


@NgModule({
  declarations: [
    SuggestionItemComponent,
    CategoryChipsComponent,
    UpvoteItemComponent,
    CommentsCountComponent
  ],
  imports: [CommonModule, HttpClientModule],
  exports: [CommonModule, SuggestionItemComponent, CategoryChipsComponent, UpvoteItemComponent, CommentsCountComponent],
  providers: []
})
export class SharedModule { }
