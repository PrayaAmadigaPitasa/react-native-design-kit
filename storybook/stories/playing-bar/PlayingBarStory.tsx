import React from 'react';
import {StyleSheet, View} from 'react-native';
import {PlayingBar} from '../../../src';

export default function PlayingBarFunction() {
  return (
    <View style={styles.container}>
      <PlayingBar />
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
