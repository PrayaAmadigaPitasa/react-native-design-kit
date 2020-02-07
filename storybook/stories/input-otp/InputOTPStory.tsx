import React from 'react';
import {StyleSheet, View} from 'react-native';
import {InputOTP, InputOTPProps} from '../../../src';

export interface InputOTPStoryProps extends InputOTPProps {}

export default function InputOTPStory({
  focusInputContainerStyle,
  onChangeOTP = () => {},
}: InputOTPStoryProps) {
  return (
    <View style={styles.container}>
      <InputOTP
        focusInputContainerStyle={StyleSheet.flatten([
          styles.focusInputContainer,
          focusInputContainerStyle,
        ])}
        onChangeOTP={onChangeOTP}
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
});
