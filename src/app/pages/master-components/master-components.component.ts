import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputMaskComponent } from '@shared/components/atoms/inputs/input-mask/input-mask.component';
import { InputComponent } from '@shared/components/atoms/inputs/input/input.component';
import { CNPJ_MASK } from '@shared/helpers/consts';
import { validadorCNPJ } from '@shared/helpers/validators';
import { CnpjPipe } from '@shared/pipes/cnpj.pipe';

@Component({
  selector: 'guep-master-components',
  standalone: true,
  imports: [InputComponent, ReactiveFormsModule, InputMaskComponent, CnpjPipe],
  templateUrl: './master-components.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MasterComponentsComponent {
  private _builder = inject(FormBuilder);

  protected model = this._getModel();
  protected readonly cnpjMask = signal(CNPJ_MASK);

  private _getModel() {
    return this._builder.group({
      input: ['', [Validators.required]],
      inputMask: ['', [Validators.required]],
      cnpj: ['', [Validators.required, validadorCNPJ()]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  logModel() {
    console.log(this.model.getRawValue());
  }
}
