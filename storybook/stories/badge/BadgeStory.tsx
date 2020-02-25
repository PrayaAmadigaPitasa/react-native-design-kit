import React from 'react';
import {StyleSheet, View} from 'react-native';
import {BadgeProps, Badge} from '../../../src';

export interface BadgeStoryProps extends BadgeProps {}

export default function BadgeStory({...props}: BadgeStoryProps) {
  return (
    <View style={styles.container}>
      <Badge {...props} value="99+" />
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
