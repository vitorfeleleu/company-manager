import type { Routes } from '@angular/router';
import { PagesComponent } from './pages.component';

export const PAGES_ROUTES: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: 'master-components',
        loadComponent: () =>
          import('./master-components/master-components.component').then(
            (c) => c.MasterComponentsComponent
          ),
      },
      {
        path: 'company',
        loadChildren: () =>
          import('./company/company.routes').then((r) => r.COMPANY_ROUTES),
      },
      { path: '', redirectTo: 'company', pathMatch: 'full' },
    ],
  },
];
