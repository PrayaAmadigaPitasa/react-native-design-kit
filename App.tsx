import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Avatar} from './src';

export default function App() {
  return (
    <View style={styles.container}>
      <Avatar
        source={{
          uri:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRzsqqgesZavhYaOVQ9dGueMWLgfo_5b3gLpnjaRcevpS7CAcyt',
        }}
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
