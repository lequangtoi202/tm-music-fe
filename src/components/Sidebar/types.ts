interface MenuItem {
  label: string;
  icon: React.ReactNode;
  to: string;
}

interface SidebarMenuProps {
  menus: MenuItem[];
}

export type { SidebarMenuProps, MenuItem };
