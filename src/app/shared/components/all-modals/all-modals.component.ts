/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { AppState } from 'store/reducers';
import { layoutSelectors } from 'store/selectors/layout.selectors'

@Component({
  selector: 'app-all-modals',
  templateUrl: './all-modals.component.html',
  styleUrls: ['./all-modals.component.scss']
})
export class AllModalsComponent implements OnInit, OnDestroy {

  userIndentityModalState: boolean;
  showModal: boolean;
  modalsSubscription = new Subscription();

  constructor(private store: Store<AppState>, private renderer: Renderer2) { }

  ngOnInit(): void {
    this.modalsSubscription.add(this.store.select(layoutSelectors.getUserIdentityModaleState).subscribe((userIndentityModalState: boolean) => {
      this.userIndentityModalState = userIndentityModalState;
      this.toggleModals();
    }));
  }

  toggleModals() {
    setTimeout(() => {
      if (this.userIndentityModalState) {
        this.showModal = true;
        this.renderer.addClass(document.body, 'remove-scroll');
      }
    }, 300)

    setTimeout(() => {
      if (!this.userIndentityModalState) {
        this.showModal = false;
        this.renderer.removeClass(document.body, 'remove-scroll');
      }
    }, 600)
  }

  ngOnDestroy(): void {
    this.modalsSubscription.unsubscribe();
  }

}
