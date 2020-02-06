import React from 'react';
import {Button, ButtonProps} from '../../../src';
import {StyleSheet, View} from 'react-native';

export interface ButtonStoryProps extends ButtonProps {}

export default function ButtonStory({
  title = 'Button',
  onPress = () => {},
  ...props
}: ButtonStoryProps) {
  return (
    <View style={styles.container}>
      <Button {...props} title={title} onPress={onPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
