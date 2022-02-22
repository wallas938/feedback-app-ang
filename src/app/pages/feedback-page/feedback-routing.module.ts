import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeedbackDetailComponent } from './components/feedback-detail/feedback-detail.component';
import { FeedbackPageComponent } from './feedback-page.component';

const routes: Routes = [
  {
    path: '', component: FeedbackPageComponent,
    children: [
      {
        path: ':id', component: FeedbackDetailComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeedbackRoutingModule { }
