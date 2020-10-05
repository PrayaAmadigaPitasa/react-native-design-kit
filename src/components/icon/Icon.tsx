import React from 'react';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import {IconProps as IconVIProps} from 'react-native-vector-icons/Icon';

export interface IconProps extends IconVIProps {}

export default function Icon({...props}: IconProps) {
  return <IconFontAwesome {...props} />;
}
