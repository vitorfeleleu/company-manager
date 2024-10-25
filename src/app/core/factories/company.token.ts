import { InjectionToken } from '@angular/core';
import type { CompanyRepository } from '@core/sql/repositories/company.repository';

export const COMPANY_REPOSITORY_TOKEN = new InjectionToken<CompanyRepository>(
  'CrudRepository'
);
