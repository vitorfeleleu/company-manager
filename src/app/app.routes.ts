import type { Routes } from '@angular/router';
import { CompanyListComponent } from '@pages/company-list/company-list.component';
import { CompanyComponent } from '@pages/company/company.component';

export const APP_ROUTES: Routes = [
  {
    path: 'add',
    component: CompanyComponent,
  },
  {
    path: 'list',
    component: CompanyListComponent,
  },
  {
    path: 'edit/:id',
    component: CompanyComponent,
  },
];
