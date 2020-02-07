import React from 'react';
import {StyleSheet, View} from 'react-native';
import {PlayingBar, PlayingBarProps} from '../../../src';

export interface PlayingBarStoryProps extends PlayingBarProps {}

export default function PlayingBarStory({...props}: PlayingBarStoryProps) {
  return (
    <View style={styles.container}>
      <PlayingBar {...props} />
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
