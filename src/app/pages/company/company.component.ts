import { NgFor } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  type OnInit,
  inject,
  input,
} from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  type UntypedFormGroup,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AddCompanyUseCase } from '@core/sql/use-cases/company/add-company.use-case';
import { GetCompanyByIdUseCase } from '@core/sql/use-cases/company/get-company-by-id.use-case';
import { UpdateCompanyUseCase } from '@core/sql/use-cases/company/update-company.use-case';
import { CompanyListComponent } from '@pages/company-list/company-list.component';

@Component({
  selector: 'guep-company',
  standalone: true,
  imports: [NgFor, RouterLink, CompanyListComponent, ReactiveFormsModule],
  templateUrl: './company.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompanyComponent implements OnInit {
  private addCompanyUseCase = inject(AddCompanyUseCase);
  private getCompanyByIdUseCase = inject(GetCompanyByIdUseCase);
  private updateCompanyUseCase = inject(UpdateCompanyUseCase);
  private builder = inject(FormBuilder);
  private router = inject(Router);

  protected model: UntypedFormGroup = this._getMotel();
  public id = input();

  async ngOnInit() {
    console.log(this.id());

    if (this.id()) {
      const dto = await this.getCompanyByIdUseCase.execute(Number(this.id()));
      console.log(dto);

      if (dto) {
        this.model.patchValue(dto);
      }
    }
  }

  private _getMotel() {
    return this.builder.group({
      id: [''],
      companyName: [''],
      cnpj: [''],
      address: [''],

      contact: this.builder.group({
        email: [''],
        phone: [''],
        telephone: [''],
      }),
    });
  }

  onSubmit() {
    const dto = this.model.getRawValue();
    if (this.id()) {
      this.updateCompanyUseCase.execute(Number(this.id()), dto);
      this.router.navigate(['/list']);
    } else {
      this.addCompanyUseCase.execute(dto);
    }
  }
}
