import React from 'react';
import {View, StyleSheet} from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <View />
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
