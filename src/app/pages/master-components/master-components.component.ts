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
import { ConfirmeDialogComponent } from '@shared/components/organisms/dialogs/confirme-dialog/confirme-dialog.component';
import { StandardPageComponent } from '@shared/components/organisms/standard-page/standard-page.component';
import { BaseFormDirective } from '@shared/directives/base-form.directive';
import { ButtonDirective } from '@shared/directives/button.directive';
import { validadorCNPJ } from '@shared/helpers/validators';
import { CnpjPipe } from '@shared/pipes/cnpj.pipe';
import { DialogService } from 'primeng/dynamicdialog';

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
  private _dialog = inject(DialogService);

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

  protected showDialog(): void {
    const ref = this._dialog.open(ConfirmeDialogComponent, {
      data: {
        title: 'Lorem Ipsum dolor',
        description:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus, tempora!',
      },
    });
    ref.onClose.subscribe((response) => {
      if (response) {
        console.log(response);
      }
    });
  }
}
