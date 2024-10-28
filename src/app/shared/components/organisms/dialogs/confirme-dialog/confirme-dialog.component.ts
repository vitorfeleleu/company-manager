import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { DialogContentComponent } from '@shared/components/molecules/dialog-content/dialog-content.component';
import { ButtonDirective } from '@shared/directives/button.directive';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'guep-confirme-dialog',
  standalone: true,
  imports: [DialogContentComponent, ButtonDirective],
  templateUrl: './confirme-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmeDialogComponent {
  private _dialogRef = inject(DynamicDialogRef);
  private _config: DynamicDialogConfig = inject(DynamicDialogConfig);

  protected title = signal<string>(this._config.data?.title);
  protected description = signal(this._config.data?.description);

  protected closeDialog(): void {
    this._dialogRef.close();
  }

  protected confirm() {
    this._dialogRef.close(true);
  }
}
