import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Chip} from './src';

export default function App() {
  return (
    <View style={styles.container}>
      <Chip
        horizontal
        actionType="radio"
        chips={['Place', 'Hotel', 'Road', 'Mansion', 'Highway', 'Store']}
        horizontalScrollButton={false}
        onSelect={() => {}}
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
