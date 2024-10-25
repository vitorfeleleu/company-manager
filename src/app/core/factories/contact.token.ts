import { InjectionToken } from '@angular/core';
import type { ContactRepository } from '@core/sql/repositories/contact.repository';

export const CONTACT_REPOSITORY_TOKEN = new InjectionToken<ContactRepository>(
  'ContactRepository'
);
