import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  input,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormBuilder,
  ReactiveFormsModule,
  type UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import {
  CNPJ_MASK,
  TELEPHONE_MASK,
  VIEW_TELEPHONE_MASK,
} from '@core/constant/masks';
import { AddCompanyUseCase } from '@core/sql/use-cases/company/add-company.use-case';
import { GetCompanyByCnpjUseCase } from '@core/sql/use-cases/company/get-company-by-cnpj.use-case';
import { GetCompanyByIdUseCase } from '@core/sql/use-cases/company/get-company-by-id.use-case';
import { UpdateCompanyUseCase } from '@core/sql/use-cases/company/update-company.use-case';
import { InputMaskComponent } from '@shared/components/atoms/inputs/input-mask/input-mask.component';
import { InputComponent } from '@shared/components/atoms/inputs/input/input.component';
import { BaseFormDirective } from '@shared/directives/base-form.directive';
import { ButtonDirective } from '@shared/directives/button.directive';
import { validadorCNPJ } from '@shared/helpers/validators';
import { filter, tap } from 'rxjs';

@Component({
  selector: 'guep-company-form-template',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ButtonDirective,
    InputComponent,
    InputMaskComponent,
  ],
  templateUrl: './company-form-template.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompanyFormTemplateComponent extends BaseFormDirective {
  private _builder = inject(FormBuilder);
  private _addCompanyUseCase = inject(AddCompanyUseCase);
  private _getCompanyByIdUseCase = inject(GetCompanyByIdUseCase);
  private _updateCompanyUseCase = inject(UpdateCompanyUseCase);
  private _getCompanyByCnpjUseCase = inject(GetCompanyByCnpjUseCase);
  private _router = inject(Router);
  private _destroy = inject(DestroyRef);

  protected override model: UntypedFormGroup = this._getModel();
  protected readonly maskInputCNPJ = signal(CNPJ_MASK);
  protected readonly maskInputTelephone = signal(TELEPHONE_MASK);
  protected readonly maskViewTelephone = signal(VIEW_TELEPHONE_MASK);

  public companyId = input.required<string>();

  async ngOnInit() {
    console.log(this.companyId());
    this._checkCnpjRegistered();
    this._initialValueForm();
  }

  private async _initialValueForm() {
    if (this.companyId()) {
      const dto = await this._getCompanyByIdUseCase.execute(
        Number(this.companyId())
      );

      console.log(dto);

      if (!dto) {
        this._companyNotFound();
      }

      this._controls.cnpj.disable();
      if (dto) {
        this.model.patchValue(dto);
      }
    }
  }

  private _getModel() {
    return this._builder.group({
      companyName: ['', Validators.required],
      cnpj: ['', [Validators.required, validadorCNPJ()]],
      address: ['', Validators.required],
      contact: this._builder.group({
        email: ['', Validators.required],
        telephone: [''],
        phone: ['', Validators.required],
      }),
    });
  }

  private get _controls() {
    return this.model.controls;
  }

  override submit(_params?: unknown): void {
    const dto = this.model.getRawValue();
    if (this.companyId()) {
      this._updateCompanyUseCase.execute(Number(this.companyId()), dto);
    } else {
      this._addCompanyUseCase.execute(dto);
      this.showToast({
        severity: 'success',
        summary: 'Sucesso',
        detail: 'Empresa salva com sucesso!',
      });
    }
    this.backRoute();
  }

  protected backRoute() {
    this._router.navigate(['/company/list']);
  }

  private _checkCnpjRegistered() {
    if (!this.companyId()) {
      const cnpjValid = 14;

      this._controls.cnpj.valueChanges
        .pipe(
          filter((element) => element.length >= cnpjValid),
          takeUntilDestroyed(this._destroy),
          tap(async (value) => {
            const dto = await this._getCompanyByCnpjUseCase.execute(value);

            if (dto?.id) {
              this._controls.cnpj.setErrors({
                ...this._controls.cnpj.errors,
                isRegistered: 'CNPJ já cadastrado',
              });
            }
          })
        )
        .subscribe();
    }
  }

  private _companyNotFound() {
    this.showToast({
      severity: 'error',
      summary: 'Error',
      detail: 'Empresa não encontrada',
    });
    this.backRoute();
  }
}
