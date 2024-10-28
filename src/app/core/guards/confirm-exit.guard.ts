import { Injectable, inject } from '@angular/core';

import type { FormGroup } from '@angular/forms';
import { ConfirmeDialogComponent } from '@shared/components/organisms/dialogs/confirme-dialog/confirme-dialog.component';
import { DialogService } from 'primeng/dynamicdialog';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConfirmExitGuard {
  private _dialog = inject(DialogService);

  public isValid(formGroup: FormGroup) {
    if (formGroup && !formGroup.pristine) {
      return this._showConfirmeDialog();
    }
    return true;
  }

  private async _showConfirmeDialog(): Promise<boolean> {
    const dialogRef = this._dialog.open(ConfirmeDialogComponent, {
      data: {
        title: 'Confirmação de saída',
        description: 'As alterações não foram salvas, deseja realmente sair?',
      },
    });
    const resultData = await firstValueFrom(dialogRef.onClose);
    return !!resultData;
  }
}
