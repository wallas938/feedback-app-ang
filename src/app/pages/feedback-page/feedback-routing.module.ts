import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeedbackDetailComponent } from './components/feedback-detail/feedback-detail.component';
import { FeedbackFormComponent } from './components/feedback-form/feedback-form.component';
import { FeedbackPageComponent } from './feedback-page.component';
import { FeedbackResolver } from './resolvers/feedback.resolver';

const routes: Routes = [
  {
    path: '', component: FeedbackPageComponent,
    children: [
      {
        path: 'new-feedback', component: FeedbackFormComponent
      },
      {
        path: 'edit-feedback/:id',
        component: FeedbackFormComponent,
        resolve: {
          feedback: FeedbackResolver
        }
      },
      {
        path: ':id',
        component: FeedbackDetailComponent,
        resolve: {
          feedback: FeedbackResolver
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeedbackRoutingModule { }
