import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainLayoutComponent } from '@shared/components/templates/main-layout/main-layout.component';

@Component({
  selector: 'guep-pages',
  standalone: true,
  imports: [RouterOutlet, MainLayoutComponent],
  template: `
    <guep-main-layout>
      <router-outlet />
    </guep-main-layout>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PagesComponent {}
