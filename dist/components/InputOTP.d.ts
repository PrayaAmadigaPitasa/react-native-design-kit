/// <reference types="react" />
import { ViewStyle, TextInputProps } from 'react-native';
export interface InputOTPBaseProps {
    inputContainerStyle?: ViewStyle;
    placeholderComponent?: JSX.Element;
}
export interface InputOTPProps extends TextInputProps, InputOTPBaseProps {
    firstEmptyFocus?: boolean;
    numberOfCode?: number;
    containerStyle?: ViewStyle;
    separatorComponent?: JSX.Element;
    onChangeOTP?(values: string[], isValid: boolean): void;
}
export interface InputOTPBoxProps extends TextInputProps, InputOTPBaseProps {
    refInput?(instance: any): void;
}
export declare function InputOTPBox({ inputContainerStyle, placeholderComponent, refInput, onFocus, onBlur, ...props }: InputOTPBoxProps): JSX.Element;
export default function InputOTP({ firstEmptyFocus, numberOfCode, containerStyle, separatorComponent, onChangeOTP, onFocus, onChangeText, onKeyPress, ...props }: InputOTPProps): JSX.Element;
