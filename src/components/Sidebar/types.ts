export enum MenuType {
  LINK_ITEM = 'link_item',
  BUTTON_ITEM = 'button_item',
  PREMIUM = 'premium'
}
interface MenuItem {
  label: string;
  icon: React.ReactNode;
  to?: string;
  type: MenuType;
}

interface SidebarMenuProps {
  menus: MenuItem[];
}

export type { SidebarMenuProps, MenuItem };
