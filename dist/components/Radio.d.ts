import {ReactNode} from 'react';
import {TextStyle, ViewStyle, TouchableOpacityProps} from 'react-native';
export interface RadioInfo {
  id: string;
  isSelected: boolean;
}
export interface RadioBaseProps {
  radioContainerStyle?: ViewStyle;
  radioSelectContainerStyle?: ViewStyle;
  radioComponentContainerStyle?: ViewStyle;
  selectedRadio?: JSX.Element;
  disabledRadio?: JSX.Element;
  title?: string;
  titleStyle?: TextStyle;
}
export interface RadioItemProps extends TouchableOpacityProps, RadioBaseProps {
  isSelected?: boolean;
  children?: ReactNode;
}
export interface RadioProps extends TouchableOpacityProps, RadioBaseProps {
  containerStyle?: ViewStyle;
  radioIds: string[];
  radioComponent?(info: RadioInfo): string | JSX.Element;
  defaultId?: string;
  onSelect(id: string): void;
}
export declare function RadioItem({
  isSelected,
  selectedRadio,
  disabledRadio,
  title,
  titleStyle,
  radioContainerStyle,
  radioSelectContainerStyle,
  radioComponentContainerStyle,
  children,
  ...props
}: RadioItemProps): JSX.Element;
export default function Radio({
  containerStyle,
  radioIds,
  radioComponent,
  defaultId,
  selectedRadio,
  disabledRadio,
  titleStyle,
  onSelect,
  radioContainerStyle,
  radioSelectContainerStyle,
  radioComponentContainerStyle,
  onPress,
  ...props
}: RadioProps): JSX.Element;
