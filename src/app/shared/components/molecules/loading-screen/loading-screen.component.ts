import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'guep-loading-screen',
  standalone: true,
  imports: [],
  templateUrl: './loading-screen.component.html',
  styleUrl: './loading-screen.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingScreenComponent {
  public textLoading = input<string>();
  public styleClassText = input('text-subtitle-1');
}
