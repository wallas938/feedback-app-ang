import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuggestionsComponent } from './pages/suggestions/suggestions.component';

const routes: Routes = [
  { path: '', redirectTo: 'suggestions', pathMatch: 'full' },
  { path: 'suggestions', component: SuggestionsComponent },
  { path: '**', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
