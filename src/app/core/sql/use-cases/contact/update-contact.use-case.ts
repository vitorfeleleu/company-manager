import { Injectable, inject } from '@angular/core';
import { CONTACT_REPOSITORY_TOKEN } from '@core/factories/contact.token';
import type { ContactInterface } from '@shared/interfaces/contact';

@Injectable({
  providedIn: 'root',
})
export class UpdateContactUseCase {
  private _contactRepository = inject(CONTACT_REPOSITORY_TOKEN);

  public async execute(id: number, company: ContactInterface): Promise<void> {
    await this._contactRepository.update(id, company);
  }
}
