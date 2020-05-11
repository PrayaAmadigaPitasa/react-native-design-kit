import React from 'react';
import {StyleSheet, View} from 'react-native';

export interface SwiperStoryProps {}

export default function SwiperStory() {
  return <View style={styles.container} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    height: '100%',
    width: '100%',
  },
});
