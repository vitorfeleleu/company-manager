import {
  ChangeDetectionStrategy,
  Component,
  type OnInit,
  inject,
  signal,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { TELEPHONE_MASK } from '@core/constant/masks';
import { DeleteCompanyUseCase } from '@core/sql/use-cases/company/delete-company.use-case';
import { ListCompanyUseCase } from '@core/sql/use-cases/company/list-company.use-case';
import { ConfirmeDialogComponent } from '@shared/components/organisms/dialogs/confirme-dialog/confirme-dialog.component';
import { TableComponent } from '@shared/components/organisms/table/table.component';
import { ButtonDirective } from '@shared/directives/button.directive';
import type { CompanyInterface } from '@shared/interfaces/company';
import { CnpjPipe } from '@shared/pipes/cnpj.pipe';
import { NgxMaskPipe } from 'ngx-mask';
import { DialogService } from 'primeng/dynamicdialog';
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
    RouterLink,
  ],
  templateUrl: './company-list-template.component.html',
  styles: `
    :host {
      width: 100%;
      max-width: 1440px;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompanyListTemplateComponent implements OnInit {
  private _listCompanyUseCase = inject(ListCompanyUseCase);
  private _deleteCompanyUseCase = inject(DeleteCompanyUseCase);
  private _router = inject(Router);
  private _dialog = inject(DialogService);

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
    this._showConfirmDeletionDialog(id);
  }

  private _showConfirmDeletionDialog(id: number) {
    const ref = this._dialog.open(ConfirmeDialogComponent, {
      data: {
        title: 'Confirmação de Exclusão',
        description: 'Tem certeza de que deseja remover esta empresa?',
      },
    });
    ref.onClose.subscribe((response) => {
      if (response) {
        this._deleteCompanyUseCase.execute(id);
        this._getCompanies();
      }
    });
  }
}
