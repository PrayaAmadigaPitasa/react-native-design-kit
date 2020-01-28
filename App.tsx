import React from 'react';
import {View, StyleSheet} from 'react-native';
import {ButtonGroup} from 'react-native-design-kit';

export default function App() {
  return (
    <View style={styles.container}>
      <View />
      <ButtonGroup buttonIds={['Alpha', 'Beta']} onSelect={() => {}} />
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
