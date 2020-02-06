import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Stepper} from '../../../src';

export default function StepperStory() {
  return (
    <View style={styles.container}>
      <Stepper />
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
