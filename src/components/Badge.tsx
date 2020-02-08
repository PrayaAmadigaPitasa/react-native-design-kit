import React, {ReactNode} from 'react';
import {StyleSheet, View, Text} from 'react-native';

export interface BadgeProps {
  value?: ReactNode;
  size?: number;
  color?: string;
  children?: ReactNode;
}

export default function Badge({
  value,
  size = 16,
  color = 'red',
  children,
}: BadgeProps) {
  function getComponent(input: string | number | ReactNode) {
    if (typeof input === 'string' || typeof input === 'number') {
      return <Text>{input}</Text>;
    }

    return input;
  }

  return (
    <View
      style={StyleSheet.flatten([
        styles.container,
        {height: size, minWidth: size, borderRadius: size / 2},
        color !== undefined && {backgroundColor: 'red'},
      ])}>
      {value !== undefined ? getComponent(value) : getComponent(children)}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
  },
});
