import React, {ReactNode} from 'react';
import {
  TouchableHighlight,
  TouchableOpacity,
  TouchableOpacityProps,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {TouchableType} from '../../types';

export interface TouchableProps extends TouchableOpacityProps {
  touchableType?: TouchableType;
  children?: ReactNode;
}

export default function Touchable({
  touchableType = 'opacity',
  activeOpacity = 0.75,
  style,
  children,
  ...props
}: TouchableProps) {
  switch (touchableType) {
    case 'opacity':
      return (
        <TouchableOpacity
          {...props}
          style={style}
          activeOpacity={activeOpacity}>
          {children}
        </TouchableOpacity>
      );
    case 'highlight':
      return (
        <TouchableHighlight {...props} activeOpacity={activeOpacity}>
          <View style={style}>{children}</View>
        </TouchableHighlight>
      );
    default:
      return (
        <TouchableWithoutFeedback {...props}>
          <View style={style}>{children}</View>
        </TouchableWithoutFeedback>
      );
  }
}
