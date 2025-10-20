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
  { label: 'Bitter Kola', href: '/bitter-kola' },
  { label: 'Choconut', href: '/choconut' },
  { label: 'All Products', href: '/products' },
];

export const RESOURCE_ITEMS: NavItemBase[] = [
  { label: 'Blog', href: '/blog' },
  { label: 'Recipes', href: '/recipes' },
];

// export const storesItems: NavItemBase[] = [
//   { label: 'Contact Us', href: '/contact-us' },
//   { label: 'Export With Us', href: '/export-with-us' },
// ];

export const NAV_ITEMS = [
  {
    label: 'SHOP',
    dropdownItems: [
      { label: 'Original', href: '/original' },
      { label: 'Choconut', href: '/choconut' },
      { label: 'Bitter Kola', href: '/bitter-kola' },
      { label: 'Ginger', href: '/ginger' },
      { label: 'Lemon Grass', href: '/lemon-grass' },
      { label: 'Citrus Limon & Clove', href: '/citrus-limon-clove' },
      { label: 'All Products', href: '/products' }
    ]
  },
  {
    label: 'DISTRIBUTORS',
    dropdownItems: [
      { label: 'Local Distributors', href: '/local-distributors' },
      { label: 'International Distributors', href: '/international-distributors' }
    ]
  },
  { label: 'EXPORT DEPARTMENT', href: '/export-department' },
  // { label: 'STORES', dropdownItems: storesItems },
  { label: 'ABOUT US', href: '/about-us' },
  { label: 'RESOURCE', dropdownItems: RESOURCE_ITEMS },
  { label: 'CONTACT US', href: '/contact-us' },
  { label: 'MY ACCOUNT', href: '/my-account' },
];

export const THEME = {
  colors: {
    primary: '#55006F',
    accent: '#EFE554',
  }
};