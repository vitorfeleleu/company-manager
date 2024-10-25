import { Injectable, inject } from '@angular/core';
import { CONTACT_REPOSITORY_TOKEN } from '@core/factories/contact.token';

@Injectable({
  providedIn: 'root',
})
export class DeleteContactUseCase {
  private _contactRepository = inject(CONTACT_REPOSITORY_TOKEN);

  public async execute(id: number): Promise<void> {
    await this._contactRepository.delete(id);
  }
}
