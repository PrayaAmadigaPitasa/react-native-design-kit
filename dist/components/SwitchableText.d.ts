/// <reference types="react" />
import {ViewStyle, TextStyle} from 'react-native';
export interface SwitchableTextProps {
  containerStyle?: ViewStyle;
  texts: string[];
  textStyle?: TextStyle;
  duration?: number;
  progressBar?: boolean;
  progressBarStyle?: ViewStyle;
  progressBarEasing?(value: number): number;
}
export default function SwitchableText({
  containerStyle,
  texts,
  textStyle,
  duration,
  progressBar,
  progressBarStyle,
  progressBarEasing,
}: SwitchableTextProps): JSX.Element;
