/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';
import { AppState } from 'store/reducers';
import { User } from 'store/reducers/user.reducers';
import { userSelectors } from 'store/selectors/user.selectors';
import { LayoutActions } from 'store/actions/layout.action';
import * as fadeAnimations from '../../animations/fade'
import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';
import { layoutSelectors } from 'store/selectors/layout.selectors';

@Component({
  selector: 'app-user-identity-modal',
  templateUrl: './user-identity-modal.component.html',
  styleUrls: ['./user-identity-modal.component.scss'],
  animations:
    [
      trigger('enter-in', [
        state('in', style({
          transform: 'translateY(0px)',
          opacity: 1
        })),
        transition(':enter', [
          style({
            opacity: 0,
            transform: 'translateY(-20px)',
          }),
          animate(300, style({
            opacity: 1,
            transform: 'translateY(0px)',
          }))
        ]),
        transition(':leave', [
          animate(400, style({
            opacity: 0,
            transform: 'translateY(-60px)',
          }))
        ]),
      ])
    ]
})
export class UserIdentityModalComponent implements OnInit {

  currentUser: Observable<User>;
  userIndentityModalState: Observable<boolean>;
  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.currentUser = this.store.select(userSelectors.getCurrentUser);
    this.userIndentityModalState = this.store.select(layoutSelectors.getUserIdentityModaleState);
  }

  onClose() {
    this.store.dispatch(LayoutActions.UserIdentityModalClosed());
  }
}
