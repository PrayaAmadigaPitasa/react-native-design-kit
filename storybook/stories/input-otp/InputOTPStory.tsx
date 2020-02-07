import React from 'react';
import {StyleSheet, View} from 'react-native';
import {InputOTP} from '../../../src';

export default function InputOTPStory() {
  return (
    <View style={styles.container}>
      <InputOTP
        focusInputContainerStyle={styles.focusInputContainer}
        onChangeOTP={() => {}}
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
