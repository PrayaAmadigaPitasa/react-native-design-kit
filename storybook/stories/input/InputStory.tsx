import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Input, InputProps} from '../../../src';

export interface InputStoryProps extends InputProps {}

export default function InputStory({label = 'Label', ...props}) {
  return (
    <View style={styles.container}>
      <Input {...props} label={label} />
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
