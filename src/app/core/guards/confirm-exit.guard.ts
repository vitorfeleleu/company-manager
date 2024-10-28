import { Injectable, inject } from '@angular/core';

import type { FormGroup } from '@angular/forms';
import { ConfirmeDialogComponent } from '@shared/components/organisms/dialogs/confirme-dialog/confirme-dialog.component';
import { DialogService } from 'primeng/dynamicdialog';

@Injectable({
  providedIn: 'root',
})
export class ConfirmExitGuard {
  private _dialog = inject(DialogService);

  public async isValid(formGroup: FormGroup) {
    if (formGroup && !formGroup.pristine) {
      return this._showDialog();
    }
    return true;
  }

  private _showDialog() {
    const ref = this._dialog.open(ConfirmeDialogComponent, {
      data: {
        title: 'Confirmação de saída',
        description: 'As alterações não foram salvas, deseja realmente sair?',
      },
    });

    console.log(ref.onClose);

    return ref.onClose;
  }
}
