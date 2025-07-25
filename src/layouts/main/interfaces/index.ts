export interface HeaderTabsItemProps {
  label: string;
  route: string;
}

export interface MainDrawerProps {
  opened: boolean;
  onClose: () => void;
}

export interface SearchDropdownProps extends MainDrawerProps {
  search: string;
  setSearch: (value: string) => void;
}