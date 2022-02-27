import { NgModule } from '@angular/core';

import { SharedModule } from '@/app/shared/shared.module';
import { RoadmapComponent } from './components/roadmap/roadmap.component';
import { RoadmapPageComponent } from './roadmap-page.component';
import { StatusCardComponent } from './components/status-card/status-card.component';
import { RoadmapRoutingModule } from './roadmap-routing.module';
import { RoadmapMobileComponent } from './components/roadmap-mobile/roadmap-mobile.component';

@NgModule({
  declarations: [
    RoadmapComponent,
    RoadmapPageComponent,
    StatusCardComponent,
    RoadmapMobileComponent
  ],
  imports: [
    SharedModule,
    RoadmapRoutingModule
  ],
  exports: [RoadmapPageComponent],
  providers: [],
})
export class RoadmapModule { }
