/// <reference types="react" />
import { ViewStyle } from 'react-native';
export interface SliderProps {
    containerStyle?: ViewStyle;
    minValue?: number;
    minTrackContainerStyle?: ViewStyle;
    maxValue?: number;
    maxTrackContainerStyle?: ViewStyle;
    initialValue?: number;
    button?: boolean;
    buttonValue?: number;
    trackContainerStyle?: ViewStyle;
    indicator?: boolean;
    numberOfSection?: number;
    numberOfSubSection?: number;
    onChangeValue?(value: number, progress: number): void;
}
export default function Slider({ containerStyle, minValue, minTrackContainerStyle, maxValue, maxTrackContainerStyle, initialValue, button, buttonValue, trackContainerStyle, indicator, numberOfSection, numberOfSubSection, onChangeValue, }: SliderProps): JSX.Element;
