import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeedbackDetailComponent } from './components/feedback-detail/feedback-detail.component';
import { FeedbackFormComponent } from './components/feedback-form/feedback-form.component';
import { FeedbackPageComponent } from './feedback-page.component';

const routes: Routes = [
  {
    path: '', component: FeedbackPageComponent,
    children: [
      {
        path: 'new-feedback', component: FeedbackFormComponent
      },
      {
        path: ':id',
        component: FeedbackDetailComponent,
      },

      {
        path: ':id/edit-feedback',
        component: FeedbackFormComponent,
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeedbackRoutingModule { }
