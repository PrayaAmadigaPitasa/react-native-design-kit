/// <reference types="react" />
import { ImageProps, ViewStyle } from 'react-native';
export interface AvatarProps extends ImageProps {
    containerStyle?: ViewStyle;
    rounded?: boolean;
    size?: number;
}
export default function Avatar({ containerStyle, rounded, size, style, source, ...props }: AvatarProps): JSX.Element;
