import React from 'react';
import {StyleSheet, View, Alert} from 'react-native';
import {ButtonGroup} from '../../../src';

export default function ButtonGroupStory() {
  return (
    <View style={styles.container}>
      <ButtonGroup
        buttonIds={['Apple', 'Melon', 'Banana', 'Pear', 'Grape']}
        onSelect={id => Alert.alert(`ID: ${id}`)}
      />
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
