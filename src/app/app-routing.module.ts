import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuggestionsComponent } from '@/pages/suggestions/suggestions.component';

const routes: Routes = [
  { path: '', redirectTo: 'suggestions', pathMatch: 'full' },
  { path: 'suggestions', component: SuggestionsComponent },
  { path: 'feedbacks', loadChildren: () => import('@/app/pages/feedback-page/feedback.module').then(m => m.FeedbackModule) },
  { path: '**', redirectTo: '/suggestions', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
