export interface NavItemBase {
  label: string;
  href?: string;
}

export interface NavItemWithDropdown extends Omit<NavItemBase, 'href'> {
  dropdownItems: NavItemBase[];
}

export type NavItem = NavItemBase | NavItemWithDropdown;

export function isNavItemWithDropdown(item: NavItem): item is NavItemWithDropdown {
  return 'dropdownItems' in item;
}

export const SHOP_ITEMS: NavItemBase[] = [
  { label: 'Bitter Kola  ', href: '/bitter-kola' },
  { label: 'Choconuts', href: '/choconuts' },
  { label: 'Citrus Lemon & Clove  ', href: '/citrus-lemon-clove' },
  { label: 'Ginger', href: '/ginger' },
  { label: 'Lemon Grass', href: '/lemon-grass' },
  { label: 'Original', href: '/original' },
];

export const RESOURCE_ITEMS: NavItemBase[] = [
  { label: 'Blog', href: '/blog' },
  { label: 'Recipes', href: '/recipes' },
];

export const NAV_ITEMS: NavItem[] = [
  { label: 'SHOP', dropdownItems: SHOP_ITEMS },
  { label: 'EXPORT DEPARTMENT', href: '/export' },
  { label: 'ABOUT US', href: '/about-us' },
  { label: 'RESOURCE', dropdownItems: RESOURCE_ITEMS },
  { label: 'CONTACT', href: '/contact-us' },
  { label: 'MY ACCOUNT', href: '/my-account' },

];

export const THEME = {
  colors: {
    primary: '#55006F',
    accent: '#EFE554',
  }
}; 