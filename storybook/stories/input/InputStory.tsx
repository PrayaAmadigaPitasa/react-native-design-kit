import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Input, InputProps} from '../../../src';

export interface InputStoryProps extends InputProps {}

export default function InputStory({
  labelPosition,
  label = 'Label',
  focusInputContainerStyle,
  focusLabelContainerStyle,
  ...props
}: InputStoryProps) {
  return (
    <View style={styles.container}>
      <Input
        {...props}
        label={label}
        labelPosition={labelPosition}
        focusInputContainerStyle={StyleSheet.flatten([
          styles.focusInputContainer,
          focusInputContainerStyle,
        ])}
        focusLabelContainerStyle={StyleSheet.flatten([
          labelPosition === 'border' && styles.focusLabelContainer,
          focusLabelContainerStyle,
        ])}
      />
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
  focusInputContainer: {
    borderColor: 'dodgerblue',
  },
  focusLabelContainer: {
    borderColor: 'dodgerblue',
  },
});
