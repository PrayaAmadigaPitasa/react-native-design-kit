import React from 'react';
import {View, Image, ImageProps, ViewStyle, StyleSheet} from 'react-native';

export interface AvatarProps extends ImageProps {
  containerStyle?: ViewStyle;
  rounded?: boolean;
  size?: number;
}

export default function Avatar({
  containerStyle,
  rounded = true,
  size = 48,
  style,
  source,
  ...props
}: AvatarProps) {
  return (
    <View style={containerStyle}>
      <Image
        {...props}
        style={StyleSheet.flatten([
          style,
          {height: size, width: size},
          rounded ? {borderRadius: size / 2} : {},
        ])}
        source={source}
      />
    </View>
  );
}
