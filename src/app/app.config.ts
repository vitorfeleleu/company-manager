import {
  APP_INITIALIZER,
  type ApplicationConfig,
  DEFAULT_CURRENCY_CODE,
  LOCALE_ID,
} from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { provideHttpClient } from '@angular/common/http';
import { COMPANY_REPOSITORY_TOKEN } from '@core/factories/company.token';
import { CONTACT_REPOSITORY_TOKEN } from '@core/factories/contact.token';
import { DatabaseService } from '@core/services/database.service';
import { SQLiteCompanyRepository } from '@core/sql/repositories/sqlite-company.repository';
import { SQLiteContactRepository } from '@core/sql/repositories/sqlite-contact.repository';
import { APP_ROUTES } from './app.routes';

export function initializeApp(dbService: DatabaseService): () => Promise<void> {
  return () => dbService.initializeDatabase();
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(APP_ROUTES, withComponentInputBinding()),
    provideHttpClient(),
    { provide: LOCALE_ID, useValue: 'pt' },
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL' },

    {
      provide: COMPANY_REPOSITORY_TOKEN,
      useClass: SQLiteCompanyRepository,
    },
    {
      provide: CONTACT_REPOSITORY_TOKEN,
      useClass: SQLiteContactRepository,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [DatabaseService],
      multi: true,
    },
  ],
};
