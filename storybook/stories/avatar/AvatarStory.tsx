import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Avatar, AvatarProps} from '../../../src';

export interface AvatarStoryProps extends AvatarProps {}

export default function AvatarStory({
  size = 240,
  source,
  ...props
}: AvatarStoryProps) {
  return (
    <View style={styles.container}>
      <Avatar
        {...props}
        size={size}
        source={
          source || {
            uri: 'https://pbs.twimg.com/media/DgEJnDkXkAIBqGH.png:large',
          }
        }
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
