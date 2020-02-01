import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Input} from './src';

export default function App() {
  return (
    <View style={styles.container}>
      <Input
        leftIconAction="toggleVisiblity"
        rightIconAction="delete"
        label="Title"
        labelPosition="box"
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
