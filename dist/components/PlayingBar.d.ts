/// <reference types="react" />
import { ViewProps, ViewStyle } from 'react-native';
export interface PlayingBarItemBaseProps {
    barStyle?: ViewProps;
}
export interface PlayingBarItemProps extends PlayingBarItemBaseProps {
    height: number;
}
export interface PlayingBarProps extends PlayingBarItemBaseProps {
    bars?: number[];
    containerStyle?: ViewStyle;
    minHeight?: number;
    maxHeight?: number;
    tps?: number;
    frequency?: number;
}
export declare function PlayingBarItem({ barStyle, height }: PlayingBarItemProps): JSX.Element;
export default function PlayingBar({ bars, containerStyle, minHeight, maxHeight, tps, frequency, ...props }: PlayingBarProps): JSX.Element;
