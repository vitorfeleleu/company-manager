import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ControlValueAccessorDirective } from '@shared/directives/control-value-accessor.directive';
import { LabelInputMessageErrorComponent } from '../../label-input-message-error/label-input-message-error.component';

@Component({
  selector: 'guep-input',
  standalone: true,
  imports: [ReactiveFormsModule, LabelInputMessageErrorComponent],
  templateUrl: './input.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent<T> extends ControlValueAccessorDirective<T> {}
