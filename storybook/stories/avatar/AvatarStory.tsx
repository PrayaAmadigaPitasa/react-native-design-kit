import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Avatar} from '../../../src';

export default function AvatarStory() {
  return (
    <View style={styles.container}>
      <Avatar
        rounded
        size={200}
        source={{
          uri: 'https://pbs.twimg.com/media/DgEJnDkXkAIBqGH.png:large',
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
