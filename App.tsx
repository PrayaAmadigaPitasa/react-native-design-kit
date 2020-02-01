import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Input} from './src';

export default function App() {
  return (
    <View style={styles.container}>
      <Input
        rightIconAction="toggleVisiblity"
        label="Title"
        labelPosition="border"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
