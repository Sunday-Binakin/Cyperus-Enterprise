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
  { label: 'Choconut', href: '/choconut' },
  { label: 'Citrus Lemon & Clove  ', href: '/citrus-lemon-clove' },
  { label: 'Ginger', href: '/ginger' },
  { label: 'Lemon Grass', href: '/lemon-grass' },
  { label: 'Original', href: '/original' },
];

export const RESOURCE_ITEMS: NavItemBase[] = [
  { label: 'Blog', href: '/blog' },
  { label: 'Recipes', href: '/recipes' },
];

export const exportItems: NavItemBase[] = [
  { label: 'Local Distributors', href: '/local-distributors' },
  { label: 'International Distributors', href: '/international-distributors' },
];

export const NAV_ITEMS: NavItem[] = [
  { label: 'SHOP', dropdownItems: SHOP_ITEMS },
  { label: 'EXPORTS', dropdownItems: exportItems },
  { label: 'OUR STORY', href: '/our-story' },
  { label: 'ABOUT US', href: '/about-us' },
  { label: 'RESOURCE', dropdownItems: RESOURCE_ITEMS },
  { label: 'CONTACT', href: '/contact-us' },
];

export const THEME = {
  colors: {
    primary: '#55006F',
    accent: '#EFE554',
  }
}; 