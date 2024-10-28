import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { ButtonDirective } from '@shared/directives/button.directive';

@Component({
  selector: 'guep-dialog-content',
  standalone: true,
  imports: [ButtonDirective],
  templateUrl: './dialog-content.component.html',
  styleUrl: './dialog-content.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogContentComponent {
  public styleClassHeader = input('py-3 px-4');
  public styleClassContent = input('py-2 px-4');
  public styleDialog = input('');
  public styleClassFooter = input('py-2 px-3');
  public displayHeader = input(true);
  public displayContent = input(true);
  public displayFooter = input(true);
  public dialogWidth = input('512px');
  public showCloseButton = input(true);

  public close = output<void>();

  protected closeDialog(): void {
    this.close.emit();
  }
}
