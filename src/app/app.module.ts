import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from '@/app/app-routing.module';
import { AppComponent } from '@/app/app.component';
import { SharedModule } from '@/app/shared/shared.module';
import { SuggestionsComponent } from '@/app/pages/suggestions/suggestions.component';
import { SuggestionsFilterComponent } from '@/app/pages/suggestions/components/suggestions-filter/suggestions-filter.component';
import { SuggestionsListComponent } from '@/app/pages/suggestions/components/suggestions-list/suggestions-list.component';
import { SuggestionsEmptyComponent } from '@/app/pages/suggestions/components/suggestions-empty/suggestions-empty.component';
import { MobileHeaderComponent } from './pages/suggestions/components/mobile-header/mobile-header.component';
import { LargeScreenHeaderComponent } from './pages/suggestions/components/large-screen-header/large-screen-header.component';
import { CategoryChipsComponent } from './pages/suggestions/components/category-chips/category-chips.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    SuggestionsComponent,
    SuggestionsFilterComponent,
    SuggestionsEmptyComponent,
    MobileHeaderComponent,
    LargeScreenHeaderComponent,
    CategoryChipsComponent,
    SuggestionsListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
