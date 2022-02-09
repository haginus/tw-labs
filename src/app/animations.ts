import { animate, animateChild, query, style, transition, trigger } from '@angular/animations';

export const routerFadeAnimation =
  trigger('routeAnimations', [
    transition('DoNotAnimate => *, * => DoNotAnimate', [
      style({ position: 'relative' }),
      query(':enter', [
        style({
          position: 'absolute',
          top: '30px',
          left: 0,
          right: 0,
          opacity: 0
        })
      ], { optional: true }),
      query(':leave', animateChild(), { optional: true }),
      query(':enter', [
        animate('300ms ease-in-out', style({ top: '0%', opacity: 1 }))
      ], { optional: true }),
      query(':enter', animateChild(), { optional: true })
    ]),
    transition('* <=> *', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
        })
      ], { optional: true }),
      query(':enter', [
        style({ top: '30px', opacity: 0 })
      ], { optional: true }),
      query(':leave', animateChild(), { optional: true }),
      query(':leave', [
        animate('300ms ease-in-out', style({ top: '30px', opacity: 0 }))
      ], { optional: true }),
      query(':enter', [
        animate('300ms ease-in-out', style({ top: '0%', opacity: 1 }))
      ], { optional: true }),
      query(':enter', animateChild(), { optional: true }),
    ])
  ]);