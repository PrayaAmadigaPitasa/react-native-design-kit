import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Chip, ChipProps} from '../../../src/components/chips';

export interface ChipStoryProps extends ChipProps {}

export default function ChipStory({
  chips = [
    'Apple',
    'Melon',
    'Banana',
    'Grape',
    'Pear',
    'Peach',
    'Orange',
    'Apricot',
    'Durian',
  ],
  onSelect = () => {},
  ...props
}: ChipStoryProps) {
  return (
    <View style={styles.container}>
      <Chip {...props} chips={chips} onSelect={onSelect} />
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
