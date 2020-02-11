import React from 'react';
import {StyleSheet, View, Alert} from 'react-native';
import {CheckboxProps, Checkbox} from '../../../src';

export interface CheckboxStoryProps extends CheckboxProps {}

export default function CheckboxStory({
  checkboxIds = ['Banana', 'Melon', 'Apple', 'Orange'],
  onSelect = (id, selected) => Alert.alert(`id: ${id}, selected: ${selected}`),
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
    alignItems: 'center',
    justifyContent: 'center',
  },
});
