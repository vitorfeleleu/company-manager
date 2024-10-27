import type { MenuInterface } from '@core/interfaces/menu';

export const MENU_LIST: MenuInterface[] = [
  {
    label: 'Home',
    routerLink: '/home',
    iconClass: 'home',
    disable: true,
  },
  {
    label: 'Lista de empresas',
    routerLink: '/company-list',
    iconClass: 'store',
  },
  {
    label: 'Adicionar empresa',
    routerLink: '/company-form',
    iconClass: 'add_business',
  },
];
