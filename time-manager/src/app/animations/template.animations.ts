import { trigger, sequence, state,stagger, animate, transition, style, query, animateChild } from '@angular/animations';


export const fadeOut =
trigger('fadeOut', [
  state('void', style({ background: 'pink', borderBottomColor: 'pink', opacity: 0, transform: 'translateX(-550px)', 'box-shadow': 'none' })),
  transition('void => *', sequence([
    animate(".2s ease")
  ])),
  transition('* => void', [animate("2s ease")])
]);
export const blub =
  trigger('blub', [
    transition(':leave', [
      style({ background: 'pink'}),
      query('*', stagger(-150, [animateChild()]), { optional: true })
    ]),
  ]);


 