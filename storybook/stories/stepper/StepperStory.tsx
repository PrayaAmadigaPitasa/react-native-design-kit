import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Stepper, StepperProps} from '../../../src/components';

export interface StepperStoryProps extends StepperProps {}

export default function StepperStory({...props}: StepperStoryProps) {
  return (
    <View style={styles.container}>
      <Stepper {...props} />
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
