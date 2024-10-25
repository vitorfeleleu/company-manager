import { Injectable, inject } from '@angular/core';
import { COMPANY_REPOSITORY_TOKEN } from '@core/factories/company.token';
import type { CompanyInterface } from '@shared/interfaces/company';
import { AddContactUseCase } from '../contact/add-contact.use-case';

@Injectable({
  providedIn: 'root',
})
export class AddCompanyUseCase {
  private _companyRepository = inject(COMPANY_REPOSITORY_TOKEN);
  private _addContactUseCase = inject(AddContactUseCase);

  public async execute(company: CompanyInterface): Promise<void> {
    const responseCompany = await this._companyRepository.add(company);

    if (responseCompany.id && company.contact) {
      await this._addContactUseCase.execute(
        responseCompany.id,
        company.contact
      );
    }
  }
}
