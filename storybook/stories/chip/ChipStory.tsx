import React from 'react';
import {StyleSheet, View, Alert} from 'react-native';
import {Chip} from '../../../src';

export default function ChipStory() {
  return (
    <View style={styles.container}>
      <Chip
        chips={['Apple', 'Melon', 'Banana', 'Pear', 'Grape']}
        onSelect={id => Alert.alert(`ID: ${id}`)}
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
