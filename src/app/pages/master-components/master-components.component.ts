import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputMaskComponent } from '@shared/components/atoms/inputs/input-mask/input-mask.component';
import { InputComponent } from '@shared/components/atoms/inputs/input/input.component';

@Component({
  selector: 'guep-master-components',
  standalone: true,
  imports: [InputComponent, ReactiveFormsModule, InputMaskComponent],
  templateUrl: './master-components.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MasterComponentsComponent {
  private _builder = inject(FormBuilder);

  protected model = this._getModel();

  private _getModel() {
    return this._builder.group({
      input: ['', [Validators.required]],
      inputMask: ['', [Validators.required]],
    });
  }

  logModel() {
    console.log(this.model.getRawValue());
  }
}
