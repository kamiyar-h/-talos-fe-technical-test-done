import {animate, state, style, transition, trigger} from '@angular/animations';

export let fadeIn = trigger('fadeIn', [
  state('void', style({opacity: 0})),
  transition('void => *', [animate('700ms ease-in-out')])
]);
