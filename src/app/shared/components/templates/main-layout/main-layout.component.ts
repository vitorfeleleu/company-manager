import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FooterComponent } from '@shared/components/molecules/footer/footer.component';
import { SidebarMenuComponent } from '@shared/components/organisms/sidebar-menu/sidebar-menu.component';

@Component({
  selector: 'guep-main-layout',
  standalone: true,
  imports: [SidebarMenuComponent, FooterComponent],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainLayoutComponent {}
