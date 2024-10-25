import { Injectable, inject } from '@angular/core';
import { COMPANY_REPOSITORY_TOKEN } from '@core/factories/company.token';
import type { CompanyInterface } from '@shared/interfaces/company';
import { GetContactByCompanyIdUseCase } from '../contact/get-contact-by-company-id.use-case';

@Injectable({
  providedIn: 'root',
})
export class GetCompanyByIdUseCase {
  private _companyRepository = inject(COMPANY_REPOSITORY_TOKEN);
  private _getContactByCompanyIdUseCase = inject(GetContactByCompanyIdUseCase);

  public async execute(id: number): Promise<CompanyInterface | undefined> {
    const company = await this._companyRepository.getById(id);
    const contact = await this._getContactByCompanyIdUseCase.execute(id);

    const response = {
      ...company,
      contact,
    } as CompanyInterface;

    return response;
  }
}
