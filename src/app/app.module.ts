import { NgModule } from '@angular/core';

import { AppRoutingModule } from '@/app/app-routing.module';
import { AppComponent } from '@/app/app.component';
import { SharedModule } from '@/app/shared/shared.module';
import { SuggestionsComponent } from '@/app/pages/suggestions/suggestions.component';
import { SuggestionsFilterComponent } from '@/app/pages/suggestions/components/suggestions-filter/suggestions-filter.component';
import { SuggestionsEmptyComponent } from '@/app/pages/suggestions/components/suggestions-empty/suggestions-empty.component';
import { MobileHeaderComponent } from './pages/suggestions/components/mobile-header/mobile-header.component';
import { LargeScreenHeaderComponent } from './pages/suggestions/components/large-screen-header/large-screen-header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { reducers } from 'store/reducers/index';
import { EffectsModule } from '@ngrx/effects';
import { MobileSideNavComponent } from './pages/suggestions/components/mobile-side-nav/mobile-side-nav.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { AppEffects } from 'store/effects';

@NgModule({
  declarations: [
    AppComponent,
    SuggestionsComponent,
    SuggestionsFilterComponent,
    SuggestionsEmptyComponent,
    MobileHeaderComponent,
    LargeScreenHeaderComponent,
    MobileSideNavComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    EffectsModule.forRoot(AppEffects),
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
