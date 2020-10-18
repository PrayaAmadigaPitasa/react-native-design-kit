import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Marquee, MarqueeProps} from '../../../src/components/Marquee';

export interface MarqueeStoryProps extends MarqueeProps {}

export default function MarqueeStory({...props}: MarqueeStoryProps) {
  return (
    <View style={styles.container}>
      <Marquee {...props}>
        <Text>
          Components: Avatar - Badge - Button - ButtonGroup - Chip - Header -
          Input - Marquee - Modal - Picker - PlayingBar - Radio - Slider -
          Stepper - SwitchableText
        </Text>
      </Marquee>
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
