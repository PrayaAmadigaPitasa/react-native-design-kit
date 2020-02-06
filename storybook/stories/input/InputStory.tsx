import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Input} from '../../../src';

export default function InputStory() {
  return (
    <View style={styles.container}>
      <Input label="Label" />
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
