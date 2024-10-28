import type { Routes } from '@angular/router';

export const APP_ROUTES: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/pages.routes').then((r) => r.PAGES_ROUTES),
  },
];
