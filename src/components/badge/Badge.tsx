import React, {ReactNode, useMemo} from 'react';
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
  const handleRenderContent = useMemo(() => {
    const content = value !== undefined ? value : children;

    return typeof content === 'string' || typeof content === 'number' ? (
      <Text style={StyleSheet.flatten([styles.text, style])}>{content}</Text>
    ) : (
      content
    );
  }, [value, children, style]);

  return (
    <View
      style={StyleSheet.flatten([
        styles.container,
        containerStyle,
        {height: size, minWidth: size, borderRadius: size / 2},
        color !== undefined && {backgroundColor: 'red'},
      ])}>
      {handleRenderContent}
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
