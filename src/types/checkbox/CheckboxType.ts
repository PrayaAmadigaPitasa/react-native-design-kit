export type CheckboxIdentifier = string | CheckboxCategory;
export type CheckboxCategoryStatus =
  | 'selected'
  | 'not-selected'
  | 'indeterminate';

export interface CheckboxInfo {
  id: string;
  isSelected: boolean;
}

export interface CheckboxCategory {
  title: string;
  checkboxIds: CheckboxIdentifier[];
}
