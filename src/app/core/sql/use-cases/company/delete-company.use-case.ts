import { Injectable, inject } from '@angular/core';
import { COMPANY_REPOSITORY_TOKEN } from '@core/factories/company.token';
import { DeleteContactUseCase } from '../contact/delete-contact.use-case';
import { GetContactByCompanyIdUseCase } from '../contact/get-contact-by-company-id.use-case';

@Injectable({
  providedIn: 'root',
})
export class DeleteCompanyUseCase {
  private _companyRepository = inject(COMPANY_REPOSITORY_TOKEN);
  private _getContactByCompanyIdUseCase = inject(GetContactByCompanyIdUseCase);
  private _deleteContactUseCase = inject(DeleteContactUseCase);

  public async execute(id: number): Promise<void> {
    await this._companyRepository.delete(id);

    const contact = await this._getContactByCompanyIdUseCase.execute(id);
    if (contact?.id) {
      await this._deleteContactUseCase.execute(contact.id);
    }
  }
}
