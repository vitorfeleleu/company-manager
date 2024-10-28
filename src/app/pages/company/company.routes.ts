import type { Routes } from '@angular/router';

export const COMPANY_ROUTES: Routes = [
  {
    path: 'list',
    loadComponent: () =>
      import('./company-list/company-list.component').then(
        (c) => c.CompanyListComponent
      ),
  },
  {
    path: 'create',
    loadComponent: () =>
      import('./company-form/company-form.component').then(
        (c) => c.CompanyFormComponent
      ),
  },
  {
    path: 'edit/:id',
    loadComponent: () =>
      import('./company-form/company-form.component').then(
        (c) => c.CompanyFormComponent
      ),
  },
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full',
  },
];
