import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from '@/app/app-routing.module';
import { AppComponent } from '@/app/app.component';
import { SharedModule } from '@/app/shared/shared.module';
import { SuggestionsComponent } from '@/app/pages/suggestions/suggestions.component';
import { SuggestionsFilterComponent } from '@/app/pages/suggestions/components/suggestions-filter/suggestions-filter.component';
import { SuggestionsEmptyComponent } from '@/app/pages/suggestions/components/suggestions-empty/suggestions-empty.component';


@NgModule({
  declarations: [
    AppComponent,
    SuggestionsComponent,
    SuggestionsFilterComponent,
    SuggestionsEmptyComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
