import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoadmapComponent } from './components/roadmap/roadmap.component';
import { RoadmapPageComponent } from './roadmap-page.component';

const routes: Routes = [
  {
    path: '', component: RoadmapPageComponent,
    children: [
      {
        path: '', component: RoadmapComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoadmapRoutingModule { }
