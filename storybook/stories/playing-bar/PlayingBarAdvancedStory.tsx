import React from 'react';
import PlayingBarStory, {PlayingBarStoryProps} from './PlayingBarStory';
import {StyleSheet} from 'react-native';

export interface PlayingBarAdvancedStoryProps extends PlayingBarStoryProps {}

export default function PlayingBarAdvancedStory({
  containerStyle,
  bars = [1, 0.8, 0.6, 0.4, 0.2, 1, 0.8, 0.6, 0.4, 0.2, 1, 0.8, 0.6],
  maxHeight = 36,
  minHeight = 6,
  ...props
}: PlayingBarAdvancedStoryProps) {
  return (
    <PlayingBarStory
      {...props}
      bars={bars}
      maxHeight={maxHeight}
      minHeight={minHeight}
      containerStyle={StyleSheet.flatten([styles.container, containerStyle])}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
});
