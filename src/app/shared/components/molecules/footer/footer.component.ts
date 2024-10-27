import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'guep-footer',
  standalone: true,
  template: `
    <p class="text-caption-semibold">Desenvolvido por Vitor Fel</p>
    <span class="material-symbols-rounded"> copyright </span>
  `,
  styles: `
		:host {
			position: fixed;
			display: flex;
			gap: .5rem;
			padding: .5rem 0;
			justify-content: center;
			align-items: center;
			background-color: var(--neutral-medium);
			color: var(--neutral-background);
			bottom: 0;
			left: 0;
			width: 100%;
			height: 22px;

			span {
				font-size: 16px;
			}
		}
	`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {}
