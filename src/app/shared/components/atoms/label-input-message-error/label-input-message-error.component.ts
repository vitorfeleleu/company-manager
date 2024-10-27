import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import type { ValidationErrors } from '@angular/forms';

@Component({
  selector: 'guep-label-input-message-error',
  standalone: true,
  imports: [],
  templateUrl: './label-input-message-error.component.html',
  styleUrl: './label-input-message-error.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LabelInputMessageErrorComponent {
  public errorsForm = input.required<Record<string, ValidationErrors> | null>();

  protected errorTextScreen = computed<string | null>(() =>
    this._getErrorText()
  );

  private _getErrorText(): string | null {
    const erros = this.errorsForm();

    if (!erros) return null;
    if (erros.required) return 'Campo obrigatório';
    if (erros.mask) return 'Formato incorreto';
    if (erros.email) return 'Email inválido';

    const errorKey = Object.getOwnPropertyNames(erros)[0];
    if (typeof erros[errorKey] === 'string') {
      return `${erros[errorKey]}`;
    }
    return errorKey;
  }
}
