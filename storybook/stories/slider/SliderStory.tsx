import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Slider, SliderProps} from '../../../src';

export interface SliderStoryProps extends SliderProps {}

export default function SliderStory({
  onChangeValue = () => {},
  ...props
}: SliderStoryProps) {
  return (
    <View style={styles.container}>
      <Slider {...props} onChangeValue={onChangeValue} />
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
