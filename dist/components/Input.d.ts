/// <reference types="react" />
import { TextStyle, ViewStyle, TextInputProps, TextInput } from 'react-native';
export declare type InputIcon = ((status: InputStatus) => JSX.Element) | JSX.Element;
export declare type InputIconAction = 'delete' | 'toggleVisiblity' | (() => void);
export declare type InputFillStatus = 'empty' | 'filled';
export declare type InputVisibilityStatus = 'visibile' | 'hidden';
export declare type InputStatus = 'normal' | InputFillStatus | InputVisibilityStatus;
export interface InputPositionBoxProps {
    labelBoxStandBySize?: number;
    labelBoxActiveSize?: number;
    labelBoxActiveOffset?: number;
    inputBoxActiveOffset?: number;
}
export interface InputIconProps {
    leftIcon?: InputIcon;
    leftIconAction?: InputIconAction;
    leftIconContainerStyle?: ViewStyle;
    rightIcon?: InputIcon;
    rightIconAction?: InputIconAction;
    rightIconContainerStyle?: ViewStyle;
}
export interface InputProps extends TextInputProps, InputPositionBoxProps, InputIconProps {
    containerStyle?: ViewStyle;
    label?: string;
    labelStyle?: TextStyle;
    labelPosition?: 'container' | 'box' | 'border';
    inputContainerStyle?: ViewStyle;
    inputRef?(instance: TextInput | null): void;
}
export default function Input({ containerStyle, label, labelStyle, labelPosition, inputContainerStyle, inputRef, leftIcon, leftIconAction, leftIconContainerStyle, rightIcon, rightIconAction, rightIconContainerStyle, labelBoxStandBySize, labelBoxActiveSize, labelBoxActiveOffset, inputBoxActiveOffset, onChangeText, secureTextEntry, ...props }: InputProps): JSX.Element;
