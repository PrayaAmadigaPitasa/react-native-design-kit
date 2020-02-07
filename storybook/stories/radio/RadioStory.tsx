import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Radio, RadioProps} from '../../../src';

export interface RadioStoryProps extends RadioProps {}

export default function RadioStory({
  radioIds = ['Male', 'Female', 'Prefer Not to Say'],
  onSelect = () => {},
  ...props
}: RadioStoryProps) {
  return (
    <View style={styles.container}>
      <Radio {...props} radioIds={radioIds} onSelect={onSelect} />
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
