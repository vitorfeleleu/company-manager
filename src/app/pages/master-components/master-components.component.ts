import {
  ChangeDetectionStrategy,
  Component,
  type OnInit,
  inject,
  signal,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CNPJ_MASK } from '@core/constant/masks';
import { InputMaskComponent } from '@shared/components/atoms/inputs/input-mask/input-mask.component';
import { InputComponent } from '@shared/components/atoms/inputs/input/input.component';
import { StandardPageComponent } from '@shared/components/organisms/standard-page/standard-page.component';
import { BaseFormDirective } from '@shared/directives/base-form.directive';
import { ButtonDirective } from '@shared/directives/button.directive';
import { validadorCNPJ } from '@shared/helpers/validators';
import { CnpjPipe } from '@shared/pipes/cnpj.pipe';

@Component({
  selector: 'guep-master-components',
  standalone: true,
  imports: [
    InputComponent,
    ReactiveFormsModule,
    InputMaskComponent,
    CnpjPipe,
    ButtonDirective,
    StandardPageComponent,
  ],
  templateUrl: './master-components.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MasterComponentsComponent
  extends BaseFormDirective
  implements OnInit
{
  private _builder = inject(FormBuilder);

  protected override model = this._getModel();
  protected readonly cnpjMask = signal(CNPJ_MASK);

  ngOnInit(): void {
    this.model.get('cnpj')?.disable();
  }

  private _getModel() {
    return this._builder.group({
      input: ['', [Validators.required]],
      inputMask: ['', [Validators.required]],
      cnpj: ['72.938.665/0001-51', [Validators.required, validadorCNPJ()]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  logModel() {
    console.log(this.model.getRawValue());
  }

  override submit(_params?: unknown): void {
    this.logModel();
  }
}
