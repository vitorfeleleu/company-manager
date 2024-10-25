import { Injectable, inject } from '@angular/core';
import { COMPANY_REPOSITORY_TOKEN } from '@core/factories/company.token';
import type { CompanyInterface } from '@shared/interfaces/company';
import { GetContactByCompanyIdUseCase } from '../contact/get-contact-by-company-id.use-case';
import { UpdateContactUseCase } from '../contact/update-contact.use-case';

@Injectable({
  providedIn: 'root',
})
export class UpdateCompanyUseCase {
  private _companyRepository = inject(COMPANY_REPOSITORY_TOKEN);
  private _getContactByCompanyIdUseCase = inject(GetContactByCompanyIdUseCase);
  private _updateContactUseCase = inject(UpdateContactUseCase);

  public async execute(id: number, company: CompanyInterface): Promise<void> {
    await this._companyRepository.update(id, company);

    const contact = await this._getContactByCompanyIdUseCase.execute(id);
    if (contact?.id && company.contact) {
      await this._updateContactUseCase.execute(contact.id, company.contact);
    }
  }
}
