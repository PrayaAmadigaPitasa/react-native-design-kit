import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Checkbox, CheckboxProps} from '../../../src/components';

export interface CheckboxStoryProps extends CheckboxProps {}

export default function CheckboxStory({
  checkboxIds = ['Banana', 'Melon', 'Apple', 'Orange'],
  onSelect = () => {},
  ...props
}: CheckboxStoryProps) {
  return (
    <View style={styles.container}>
      <Checkbox {...props} checkboxIds={checkboxIds} onSelect={onSelect} />
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
