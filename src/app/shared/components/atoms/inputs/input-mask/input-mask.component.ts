import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ControlValueAccessorDirective } from '@shared/directives/control-value-accessor.directive';
import { NgxMaskDirective } from 'ngx-mask';
import { LabelInputMessageErrorComponent } from '../../label-input-message-error/label-input-message-error.component';

@Component({
  selector: 'guep-input-mask',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    LabelInputMessageErrorComponent,
    NgxMaskDirective,
  ],
  templateUrl: './input-mask.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputMaskComponent<T> extends ControlValueAccessorDirective<T> {
  public maskInput = input.required<string>();
  public dropSpecialCharacters = input(true);
}
