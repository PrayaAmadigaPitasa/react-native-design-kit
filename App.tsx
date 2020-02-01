import React from 'react';
import {View, StyleSheet} from 'react-native';
import {InputOTP} from './src';

export default function App() {
  return (
    <View style={styles.container}>
      <InputOTP onChangeOTP={() => {}} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
