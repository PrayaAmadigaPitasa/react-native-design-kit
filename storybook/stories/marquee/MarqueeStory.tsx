import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Marquee, MarqueeProps} from '../../../src';

export interface MarqueeStoryProps extends MarqueeProps {}

export default function MarqueeStory({...props}: MarqueeStoryProps) {
  return (
    <View style={styles.container}>
      <Marquee {...props} />
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
