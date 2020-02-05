import React from 'react';
import {Button} from '../../../src';
import {StyleSheet, View} from 'react-native';

export default function ButtonStory() {
  return (
    <View style={styles.container}>
      <Button title="Button" />
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
