import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { SuggestionItemComponent } from './components/suggestion-item/suggestion-item.component';
import { CategoryChipsComponent } from './components/category-chips/category-chips.component';
import { CommonModule } from '@angular/common';
import { UpvoteItemComponent } from './components/upvote-item/upvote-item.component';
import { CommentsCountComponent } from './components/comments-count/comments-count.component';
import { LoadingStripeComponent } from './components/loading-stripe/loading-stripe.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserIdentityModalComponent } from './components/user-identity-modal/user-identity-modal.component';
import { AllModalsComponent } from './components/all-modals/all-modals.component';


@NgModule({
  declarations: [
    SuggestionItemComponent,
    CategoryChipsComponent,
    UpvoteItemComponent,
    CommentsCountComponent,
    LoadingStripeComponent,
    UserIdentityModalComponent,
    AllModalsComponent
  ],
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule],
  exports: [CommonModule, ReactiveFormsModule, SuggestionItemComponent, CategoryChipsComponent, UpvoteItemComponent, CommentsCountComponent, LoadingStripeComponent, AllModalsComponent],
  providers: []
})
export class SharedModule { }
