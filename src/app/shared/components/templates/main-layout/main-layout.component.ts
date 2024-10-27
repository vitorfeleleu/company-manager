import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SidebarMenuComponent } from '@shared/components/organisms/sidebar-menu/sidebar-menu.component';

@Component({
  selector: 'guep-main-layout',
  standalone: true,
  imports: [SidebarMenuComponent],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainLayoutComponent {}
