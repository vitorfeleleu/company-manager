import { NgFor } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DeleteCompanyUseCase } from '@core/sql/use-cases/company/delete-company.use-case';
import { GetCompanyByIdUseCase } from '@core/sql/use-cases/company/get-company-by-id.use-case';
import { ListCompanyUseCase } from '@core/sql/use-cases/company/list-company.use-case';
import { GetContactByCompanyIdUseCase } from '@core/sql/use-cases/contact/get-contact-by-company-id.use-case';
import type { CompanyInterface } from '@shared/interfaces/company';
import type { ContactInterface } from '@shared/interfaces/contact';

@Component({
  selector: 'guep-company-list',
  standalone: true,
  imports: [NgFor, RouterLink],
  templateUrl: './company-list.component.html',
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompanyListComponent {
  private listCompanyUseCase = inject(ListCompanyUseCase);
  private deleteCompanyUseCase = inject(DeleteCompanyUseCase);
  private getCompanyByIdUseCase = inject(GetCompanyByIdUseCase);

  private getContactByCompanyIdUseCase = inject(GetContactByCompanyIdUseCase);

  protected companies: CompanyInterface[] = [];
  protected contact: ContactInterface | undefined = undefined;
  protected company: CompanyInterface | undefined = undefined;

  async ngOnInit() {
    this.loadCompanies();
  }

  async loadCompanies() {
    const dto = await this.listCompanyUseCase.execute();
    console.log(dto);
    this.companies = dto;
  }

  protected delete(id: number) {
    this.deleteCompanyUseCase.execute(id);
    this.loadCompanies();
  }

  protected async buscar(value: string) {
    const dto = await this.getCompanyByIdUseCase.execute(Number(value));
    // console.log(value);
    // console.log(dto);

    this.company = dto;
    if (dto?.id) {
      const dto2 = await this.getContactByCompanyIdUseCase.execute(dto.id);
      this.contact = dto2;
    }
  }
}
