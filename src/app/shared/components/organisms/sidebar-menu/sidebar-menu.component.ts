import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  signal,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TOGGLE_MENU_SIDENAV } from '@core/constant/animations/toogle.animation';
import { MENU_LIST } from '@core/constant/menu-list';
import type { MenuInterface } from '@core/interfaces/menu';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'guep-sidebar-menu',
  standalone: true,
  imports: [NgClass, TooltipModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar-menu.component.html',
  styleUrl: './sidebar-menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [TOGGLE_MENU_SIDENAV],
})
export class SidebarMenuComponent {
  protected openMenu = signal(false);
  protected menuList = signal<MenuInterface[]>(MENU_LIST);

  protected tooltipMenuText = computed(() => {
    if (this.openMenu()) {
      return 'Fechar menu';
    }

    return 'Abrir menu';
  });

  protected clickToggleMenu() {
    this.openMenu.set(!this.openMenu());
  }
}
