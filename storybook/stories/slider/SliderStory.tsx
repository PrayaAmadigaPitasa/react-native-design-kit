import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Slider} from '../../../src';

export default function SliderStory() {
  return (
    <View style={styles.container}>
      <Slider onChangeValue={() => {}} />
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
