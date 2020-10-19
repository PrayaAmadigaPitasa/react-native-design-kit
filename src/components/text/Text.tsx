import React, {ReactNode} from 'react';
import {
  StyleSheet,
  Text as TextRN,
  TextProps as TextRNProps,
} from 'react-native';

export interface TextProps extends TextRNProps {
  children: ReactNode;
}

export default function Text({style, children, ...props}: TextProps) {
  return (
    <TextRN {...props} style={StyleSheet.flatten([styles.text, style])}>
      {children}
    </TextRN>
  );
}

const styles = StyleSheet.create({
  text: {
    color: 'black',
  },
});
