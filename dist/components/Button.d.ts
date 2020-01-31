import { ReactNode } from 'react';
import { ViewStyle, TextStyle, TouchableOpacityProps } from 'react-native';
export interface ButtonIconProps {
    topIcon?: JSX.Element;
    topIconContainerStyle?: ViewStyle;
    topIconAction?(): void;
    leftIcon?: JSX.Element;
    leftIconContainerStyle?: ViewStyle;
    leftIconAction?(): void;
    rightIcon?: JSX.Element;
    rightIconContainerStyle?: ViewStyle;
    rightIconAction?(): void;
    bottomIcon?: JSX.Element;
    bottomIconContainerStyle?: ViewStyle;
    bottomIconAction?(): void;
}
export interface ButtonTypeProps {
    type?: 'solid' | 'outline' | 'text';
}
export interface ButtonTitleProps {
    title?: string;
    titleStyle?: TextStyle;
    titleContainerStyle?: ViewStyle;
}
export interface ButtonRaisedProps {
    raised?: boolean;
    raisedStyle?: ViewStyle;
}
export interface ButtonBaseProps {
    containerStyle?: ViewStyle;
    disabledContainerStyle?: ViewStyle;
    disabledTitleStyle?: ViewStyle;
}
export interface ButtonProps extends TouchableOpacityProps, ButtonIconProps, ButtonRaisedProps, ButtonTypeProps, ButtonTitleProps, ButtonBaseProps {
    children?: ReactNode;
}
export default function Button({ type, raised, raisedStyle, containerStyle, title, titleStyle, titleContainerStyle, disabled, disabledContainerStyle, disabledTitleStyle, topIcon, topIconContainerStyle, topIconAction, leftIcon, leftIconContainerStyle, leftIconAction, rightIcon, rightIconContainerStyle, rightIconAction, bottomIcon, bottomIconContainerStyle, bottomIconAction, activeOpacity, children, ...props }: ButtonProps): JSX.Element;
