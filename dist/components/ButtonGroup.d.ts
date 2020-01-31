/// <reference types="react" />
import { ButtonBaseProps, ButtonTypeProps } from './Button';
import { ViewStyle, TextStyle, TouchableOpacityProps } from 'react-native';
export interface ButtonGroupInfo {
    id: string;
    isSelected: boolean;
}
export interface ButtonGroupProps extends TouchableOpacityProps, ButtonBaseProps, ButtonTypeProps {
    actionType?: 'button' | 'radio' | 'checkbox';
    buttonIds: string[];
    buttonComponent?(info: ButtonGroupInfo): string | JSX.Element;
    buttonContainerStyle?: ViewStyle;
    buttonTitleStyle?: TextStyle;
    containerBorderRadius?: number;
    standbyButtonRaised?: boolean;
    selectedButtonRaised?: boolean;
    selectedButtonContainerStyle?: ViewStyle;
    selectedButtonTitleStyle?: TextStyle;
    selectedId?: string | string[];
    onSelect(id: string, selected: string[]): void;
}
export default function ButtonGroup({ type, actionType, buttonIds, buttonComponent, buttonContainerStyle, buttonTitleStyle, containerStyle, containerBorderRadius, standbyButtonRaised, selectedButtonRaised, selectedButtonContainerStyle, selectedButtonTitleStyle, selectedId, onPress, onSelect, ...props }: ButtonGroupProps): JSX.Element;
