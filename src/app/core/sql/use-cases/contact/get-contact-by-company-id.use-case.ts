import { Injectable, inject } from '@angular/core';
import { CONTACT_REPOSITORY_TOKEN } from '@core/factories/contact.token';
import type { ContactInterface } from '@shared/interfaces/contact';

@Injectable({
  providedIn: 'root',
})
export class GetContactByCompanyIdUseCase {
  private _contactRepository = inject(CONTACT_REPOSITORY_TOKEN);

  public async execute(id: number): Promise<ContactInterface | undefined> {
    return await this._contactRepository.getByCompanyId(id);
  }
}
