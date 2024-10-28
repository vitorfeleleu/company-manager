import { Injectable, inject } from '@angular/core';
import { COMPANY_REPOSITORY_TOKEN } from '@core/factories/company.token';
import type { CompanyInterface } from '@shared/interfaces/company';

@Injectable({
  providedIn: 'root',
})
export class GetCompanyByCnpjUseCase {
  private _companyRepository = inject(COMPANY_REPOSITORY_TOKEN);

  public async execute(cnpj: string): Promise<CompanyInterface | undefined> {
    const company = await this._companyRepository.getByCnpj(cnpj);

    const response = {
      ...company,
    } as CompanyInterface;

    return response;
  }
}
