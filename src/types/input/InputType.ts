export type InputIcon = ((status: InputStatus) => JSX.Element) | JSX.Element;
export type InputIconAction =
  | 'delete'
  | 'search'
  | 'toggle-visibility'
  | (() => void);
export type InputFillStatus = 'empty' | 'filled';
export type InputVisibilityStatus = 'visibile' | 'hidden';
export type InputSearchStatus = 'empty' | 'loading' | 'forbidden' | 'allowed';
export type InputStatus =
  | 'normal'
  | InputFillStatus
  | InputVisibilityStatus
  | InputSearchStatus;
export type InputError = string | InputValidation | InputValidation[];
export type InputStrengthValidation = RegExp | ((text: string) => boolean);

export interface InputValidation {
  regex?: RegExp;
  validation?(text: string): boolean;
  error: string;
}

export interface InputSearch {
  search?: string;
  searchStatus: InputSearchStatus;
}
