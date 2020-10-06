import React, {ReactNode} from 'react';
import {
  TouchableHighlight,
  TouchableOpacity,
  TouchableOpacityProps,
  TouchableWithoutFeedback,
} from 'react-native';
import {TouchableType} from '../../types';

export interface TouchableProps extends TouchableOpacityProps {
  type?: TouchableType;
  children?: ReactNode;
}

export default function Touchable({
  type = 'opacity',
  activeOpacity = 0.75,
  children,
  ...props
}: TouchableProps) {
  switch (type) {
    case 'opacity':
      return (
        <TouchableOpacity {...props} activeOpacity={activeOpacity}>
          {children}
        </TouchableOpacity>
      );
    case 'highlight':
      return <TouchableHighlight {...props}>{children}</TouchableHighlight>;
    default:
      return (
        <TouchableWithoutFeedback {...props}>
          {children}
        </TouchableWithoutFeedback>
      );
  }
}
