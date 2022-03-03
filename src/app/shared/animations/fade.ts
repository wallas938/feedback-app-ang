import { animate, keyframes, style, transition, trigger } from "@angular/animations";

export const fadeInOutY = [
  trigger('fadeInOutY', [
    transition('void => *', [
      animate(400, keyframes([
        style({
          transform: 'translateY(-20px)',
          opacity: 0
        }),
        style({
          transform: 'translateY(0px)',
          opacity: 1
        }),
      ]))
    ])
  ])
];

export const fadeInOutX = [
  trigger('fadeInOutX', [
    transition('void => *', [
      animate(500, keyframes([
        style({
          transform: 'translateX(-20px)',
          opacity: 0,
        }),
        style({
          transform: 'translateX(0px)',
          opacity: 1
        }),
      ]))
    ])
  ])
];
