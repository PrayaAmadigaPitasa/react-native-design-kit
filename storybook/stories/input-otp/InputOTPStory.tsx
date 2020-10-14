import React from 'react';
import {StyleSheet, View} from 'react-native';
import {InputOTP, InputOTPProps} from '../../../src/components';

export interface InputOTPStoryProps extends InputOTPProps {}

export default function InputOTPStory({
  focusInputContainerStyle,
  onChangeOTP = () => {},
  separatorComponent = <View style={styles.separator} />,
}: InputOTPStoryProps) {
  return (
    <View style={styles.container}>
      <InputOTP
        focusInputContainerStyle={StyleSheet.flatten([
          styles.focusInputContainer,
          focusInputContainerStyle,
        ])}
        onChangeOTP={onChangeOTP}
        separatorComponent={separatorComponent}
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
  separator: {height: 5, width: 20, backgroundColor: 'black'},
});
