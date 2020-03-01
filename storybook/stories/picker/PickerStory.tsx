import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Picker, PickerProps} from '../../../src/components/';

export interface PickerStoryProps extends PickerProps<any> {}

export default function PickerStory({
  data = ['Apple', 'Melon', 'Banana', 'Pear', 'Grape'],
  keyExtractor = (item: any) => item,
  renderItem = ({item}) => <Text>{item}</Text>,
  onSelect = () => {},
  ...props
}: PickerStoryProps) {
  return (
    <View style={styles.container}>
      <Picker
        {...props}
        data={data}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
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
