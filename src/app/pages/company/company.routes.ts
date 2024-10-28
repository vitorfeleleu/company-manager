import { inject } from '@angular/core';
import type { FormGroup } from '@angular/forms';
import type { Routes } from '@angular/router';
import { ConfirmExitGuard } from '@core/guards/confirm-exit.guard';

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
    canDeactivate: [
      (component: { model: FormGroup }) => {
        inject(ConfirmExitGuard).isValid(component.model);
      },
    ],
  },
  {
    path: 'edit/:id',
    loadComponent: () =>
      import('./company-form/company-form.component').then(
        (c) => c.CompanyFormComponent
      ),
    canDeactivate: [
      (component: { model: FormGroup }) => {
        inject(ConfirmExitGuard).isValid(component.model);
      },
    ],
  },
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full',
  },
];
