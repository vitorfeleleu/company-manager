import {
  type AnimationTriggerMetadata,
  animate,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const TOGGLE_MENU_SIDENAV: AnimationTriggerMetadata[] = [
  trigger('toggleMenuInternal', [
    transition(':enter', [
      style({ opacity: 0 }),
      animate('500ms', style({ opacity: 1 })),
    ]),
    transition(':leave', [animate('100ms', style({ opacity: 0 }))]),
  ]),
];
