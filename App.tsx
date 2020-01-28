import React from 'react';
import {View, StyleSheet} from 'react-native';
import {InputOTP} from './src';

export default function App() {
  return (
    <View style={styles.container}>
      <InputOTP />
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
