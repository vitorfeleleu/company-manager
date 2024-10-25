import { Injectable, inject } from '@angular/core';
import { CONTACT_REPOSITORY_TOKEN } from '@core/factories/contact.token';
import type { ContactInterface } from '@shared/interfaces/contact';

@Injectable({
  providedIn: 'root',
})
export class AddContactUseCase {
  private _contactRepository = inject(CONTACT_REPOSITORY_TOKEN);

  public async execute(
    companyId: number,
    contact: ContactInterface
  ): Promise<void> {
    await this._contactRepository.add(companyId, contact);
  }
}
