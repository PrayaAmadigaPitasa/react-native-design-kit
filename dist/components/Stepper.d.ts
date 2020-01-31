/// <reference types="react" />
import { ViewStyle, TextStyle } from 'react-native';
export interface StepperProps {
    containerStyle?: ViewStyle;
    buttonContainerStyle?: ViewStyle;
    buttonTitleStyle?: TextStyle;
    buttonDisabledContainerStyle?: ViewStyle;
    buttonDisabledTitleStyle?: TextStyle;
    inputStyle?: TextStyle;
    directEdit?: boolean;
    value?: number;
    defaultValue?: number;
    minValue?: number;
    maxValue?: number;
    multiplier?: number;
    onChangeValue?(value: number): void;
}
export default function Stepper({ containerStyle, buttonContainerStyle, buttonTitleStyle, buttonDisabledContainerStyle, buttonDisabledTitleStyle, inputStyle, value, minValue, maxValue, defaultValue, multiplier, onChangeValue, }: StepperProps): JSX.Element;
