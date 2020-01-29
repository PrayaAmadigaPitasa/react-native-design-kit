import {ReactNode} from 'react';
import {ButtonBaseProps, ButtonIconProps, ButtonTitleProps} from './Button';
import {TouchableOpacityProps, TextStyle, ViewStyle} from 'react-native';
export declare type ChipIcon = (info: ChipInfo) => JSX.Element;
export declare type ChipIconAction = (
  id: string,
  isSelected: boolean,
) => 'delete' | (() => void);
export interface ChipInfo {
  id: string;
  isSelected: boolean;
}
export interface ChipIconProps {
  leftIcon?: ChipIcon;
  leftIconAction?: ChipIconAction;
  rightIcon?: ChipIcon;
  rightIconAction?: ChipIconAction;
}
export interface ChipItemBaseProps {
  rounded?: boolean;
  children?: ReactNode;
}
export interface ChipItemProps
  extends TouchableOpacityProps,
    ButtonBaseProps,
    ButtonIconProps,
    ButtonTitleProps,
    ChipItemBaseProps {}
export interface ChipProps
  extends TouchableOpacityProps,
    ButtonBaseProps,
    ChipIconProps,
    ChipItemBaseProps {
  actionType?: 'chip' | 'radio' | 'checkbox';
  chips: string[];
  chipContainerStyle?: ViewStyle;
  chipComponent?(info: ChipInfo): string | JSX.Element;
  chipTitleStyle?: TextStyle;
  selectedChipContainerStyle?: ViewStyle;
  selectedChipTitleStyle?: TextStyle;
  horizontal?: boolean;
  horizontalScrollIndicator?: boolean;
  horizontalScrollEnabled?: boolean;
  selectedId?: string | string[];
  onSelect(id: string, selected: string[]): void;
}
export declare function ChipItem({
  rounded,
  titleStyle,
  containerStyle,
  children,
  ...props
}: ChipItemProps): JSX.Element;
export default function Chip({
  actionType,
  rounded,
  containerStyle,
  chips,
  chipContainerStyle,
  chipComponent,
  chipTitleStyle,
  selectedChipContainerStyle,
  selectedChipTitleStyle,
  horizontal,
  horizontalScrollIndicator,
  horizontalScrollEnabled,
  selectedId,
  leftIcon,
  leftIconAction,
  rightIcon,
  rightIconAction,
  onSelect,
  onPress,
  activeOpacity,
  ...props
}: ChipProps): JSX.Element;
