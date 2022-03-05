/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromApp from 'store/reducers/index';
import * as fromUi from 'store/reducers/ui.reducers';
import * as fromUiActions from 'store/actions/ui.action';
import { animate, keyframes, style, transition, trigger } from '@angular/animations';


@Component({
  selector: 'app-mobile-header',
  templateUrl: './mobile-header.component.html',
  styleUrls: ['./mobile-header.component.scss'],
  animations: [
    trigger('backdropRemovalAnimation', [
      transition('* => void', [
        animate(550, keyframes([
          style({
            opacity: 1,
          }),
          style({
            opacity: 0,
          }),
        ]))
      ]),
    ])
  ]
})
export class MobileHeaderComponent implements OnInit, OnDestroy {

  menuOpened: boolean;
  constructor(private store: Store<fromApp.AppState>, private renderer: Renderer2) { }

  ngOnInit(): void {
    this.store.select('ui').subscribe((state: fromUi.State) => {
      this.menuOpened = state.mobileMenuOpened
    });
  }

  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'remove-scroll');
  }

  toggleMenu() {
    if (!this.menuOpened) {
      this.store.dispatch(new fromUiActions.MobileMenuOpened)
    } else {
      this.store.dispatch(new fromUiActions.MobileMenuClosed)
    }
    this.setBodyScrolling();
  }

  closeMenu() {
    this.store.dispatch(new fromUiActions.MobileMenuClosed);
    this.setBodyScrolling();
  }

  setBodyScrolling() {
    this.menuOpened ?
      this.renderer.addClass(document.body, 'remove-scroll') :
      this.renderer.removeClass(document.body, 'remove-scroll');
  }
}
