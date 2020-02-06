import React from 'react';
import {StyleSheet, View} from 'react-native';
import {ButtonGroup, ButtonGroupProps} from '../../../src';

export interface ButtonGroupStoryProps extends ButtonGroupProps {}

export default function ButtonGroupStory({
  buttonIds = ['Apple', 'Melon', 'Banana', 'Pear', 'Grape'],
  onSelect = () => {},
  ...props
}: ButtonGroupStoryProps) {
  return (
    <View style={styles.container}>
      <ButtonGroup {...props} buttonIds={buttonIds} onSelect={onSelect} />
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
