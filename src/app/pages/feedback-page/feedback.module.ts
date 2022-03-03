import { NgModule } from '@angular/core';

import { SharedModule } from '@/app/shared/shared.module';
import { FeedbackPageComponent } from './feedback-page.component';
import { FeedbackDetailComponent } from './components/feedback-detail/feedback-detail.component';
import { FeedbackRoutingModule } from './feedback-routing.module';
import { CommentsComponent } from './components/comments/comments.component';
import { MessageComponent } from './components/message/message.component';
import { FeedbackFormComponent } from './components/feedback-form/feedback-form.component';
import { FeedbackResolver } from './resolvers/feedback.resolver';

@NgModule({
  declarations: [
    FeedbackPageComponent,
    FeedbackDetailComponent,
    CommentsComponent,
    MessageComponent,
    FeedbackFormComponent,
  ],
  imports: [
    SharedModule,
    FeedbackRoutingModule,
  ],
  exports: [FeedbackPageComponent],
  providers: [FeedbackResolver],
})
export class FeedbackModule { }
