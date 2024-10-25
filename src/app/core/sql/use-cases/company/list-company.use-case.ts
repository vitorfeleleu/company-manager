import { Injectable, inject } from '@angular/core';
import { COMPANY_REPOSITORY_TOKEN } from '@core/factories/company.token';
import type { CompanyInterface } from '@shared/interfaces/company';
import { GetContactByCompanyIdUseCase } from '../contact/get-contact-by-company-id.use-case';

@Injectable({
  providedIn: 'root',
})
export class ListCompanyUseCase {
  private _companyRepository = inject(COMPANY_REPOSITORY_TOKEN);
  private _getContactByCompanyIdUseCase = inject(GetContactByCompanyIdUseCase);

  public async execute(): Promise<CompanyInterface[]> {
    const companies = await this._companyRepository.getAll();

    const response = await Promise.all(
      companies.map(async (res) => {
        const contact = res.id
          ? await this._getContactByCompanyIdUseCase.execute(res.id)
          : undefined;

        return {
          ...res,
          contact,
        } as CompanyInterface;
      })
    );

    return response;
  }
}
