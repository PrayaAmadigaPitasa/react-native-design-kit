export type ChipActionType = 'chip' | 'radio' | 'checkbox';

export type ChipIcon = (info: ChipInfo) => JSX.Element;

export type ChipIconAction = (
  id: string,
  isSelected: boolean,
) => 'delete' | 'check' | (() => void);

export interface ChipInfo {
  id: string;
  isSelected: boolean;
}
