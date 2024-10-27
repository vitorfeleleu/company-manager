import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { LoadingScreenComponent } from '@shared/components/molecules/loading-screen/loading-screen.component';

@Component({
  selector: 'guep-standard-page',
  standalone: true,
  imports: [LoadingScreenComponent],
  templateUrl: './standard-page.component.html',
  styleUrl: './standard-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StandardPageComponent {
  public title = input.required();
  public description = input('');
  public loadingPage = input(false);
  public textLoadingPage = input('Carregando informações...');
  public styleClassBody = input('p-4');
}
