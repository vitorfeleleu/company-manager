import {
  ChangeDetectionStrategy,
  Component,
  type OnInit,
  inject,
  signal,
} from '@angular/core';
import { Router } from '@angular/router';
import { TELEPHONE_MASK } from '@core/constant/masks';
import { DeleteCompanyUseCase } from '@core/sql/use-cases/company/delete-company.use-case';
import { ListCompanyUseCase } from '@core/sql/use-cases/company/list-company.use-case';
import { TableComponent } from '@shared/components/organisms/table/table.component';
import { ButtonDirective } from '@shared/directives/button.directive';
import type { CompanyInterface } from '@shared/interfaces/company';
import { CnpjPipe } from '@shared/pipes/cnpj.pipe';
import { NgxMaskPipe } from 'ngx-mask';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'guep-company-list-template',
  standalone: true,
  imports: [
    TableComponent,
    CnpjPipe,
    NgxMaskPipe,
    ButtonDirective,
    TooltipModule,
  ],
  templateUrl: './company-list-template.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompanyListTemplateComponent implements OnInit {
  private _listCompanyUseCase = inject(ListCompanyUseCase);
  private _deleteCompanyUseCase = inject(DeleteCompanyUseCase);
  private _router = inject(Router);

  protected companies = signal<CompanyInterface[]>([]);
  protected loadingTable = signal(true);
  protected readonly maskInputTelephone = signal(TELEPHONE_MASK);

  ngOnInit(): void {
    this._getCompanies();
  }

  private async _getCompanies() {
    const dto = await this._listCompanyUseCase.execute();
    this.companies.set(dto);
    this.loadingTable.set(false);
  }

  protected edit(id: number) {
    this._router.navigate([`/company/edit/${id}`]);
  }

  protected delete(id: number) {
    this._deleteCompanyUseCase.execute(id);
    this._getCompanies();
  }
}
