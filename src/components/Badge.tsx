import React, {ReactNode} from 'react';
import {StyleSheet, View, Text, ViewStyle, TextStyle} from 'react-native';

export interface BadgeProps {
  containerStyle?: ViewStyle;
  style?: TextStyle;
  value?: ReactNode;
  size?: number;
  color?: string;
  children?: ReactNode;
}

export default function Badge({
  containerStyle,
  style,
  value,
  size = 18,
  color = 'red',
  children,
}: BadgeProps) {
  function getComponent(input: ReactNode) {
    if (typeof input === 'string' || typeof input === 'number') {
      return (
        <Text style={StyleSheet.flatten([styles.text, style])}>{input}</Text>
      );
    }

    return input;
  }

  return (
    <View
      style={StyleSheet.flatten([
        styles.container,
        containerStyle,
        {height: size, minWidth: size, borderRadius: size / 2},
        color !== undefined && {backgroundColor: 'red'},
      ])}>
      {value !== undefined ? getComponent(value) : getComponent(children)}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 3,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  text: {
    fontSize: 12,
    color: 'white',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});
