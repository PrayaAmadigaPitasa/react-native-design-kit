import React from 'react';
import {StyleSheet, View} from 'react-native';
import {SwitchableText} from '../../../src';

export default function SwitchableTextStory() {
  return (
    <View style={styles.container}>
      <SwitchableText
        texts={[
          'True happiness is a state of fulfillment',
          'An investment in knowledge pays the best interest',
          'What you do today can improve all your tomorrows',
          'A man’s worth is no greater than his ambitions',
          'Honesty is the first chapter in the book of wisdom',
        ]}
      />
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
