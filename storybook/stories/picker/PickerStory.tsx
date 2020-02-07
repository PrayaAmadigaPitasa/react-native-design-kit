import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Picker, PickerProps} from '../../../src';

export interface PickerStoryProps<ItemT> extends PickerProps<ItemT> {}

export default function PickerStory<ItemT>({
  data,
  keyExtractor,
  renderItem,
  onSelect = () => {},
  ...props
}: PickerStoryProps<ItemT>) {
  const pickerData: readonly any[] | undefined =
    data !== undefined ? data : ['Apple', 'Melon', 'Banana', 'Pear', 'Grape'];
  const pickerKeyExtractor =
    keyExtractor !== undefined ? keyExtractor : (item: any) => item;
  const pickerRenderItem =
    renderItem !== undefined ? renderItem : ({item}) => <Text>{item}</Text>;

  return (
    <View style={styles.container}>
      <Picker
        {...props}
        data={pickerData}
        keyExtractor={pickerKeyExtractor}
        renderItem={pickerRenderItem}
        onSelect={onSelect}
      />
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
