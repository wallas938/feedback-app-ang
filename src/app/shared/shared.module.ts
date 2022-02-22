import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { SuggestionItemComponent } from './components/suggestion-item/suggestion-item.component';
import { CategoryChipsComponent } from './components/category-chips/category-chips.component';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [
    SuggestionItemComponent,
    CategoryChipsComponent
  ],
  imports: [CommonModule, HttpClientModule],
  exports: [CommonModule, SuggestionItemComponent, CategoryChipsComponent],
  providers: []
})
export class SharedModule { }
