import { NgModule } from '@angular/core';
import { MobileHeaderComponent } from '@shared/layout/mobile-header/mobile-header.component';


@NgModule({
  declarations: [
    MobileHeaderComponent
  ],
  exports: [MobileHeaderComponent],
  providers: []
})
export class SharedModule { }
