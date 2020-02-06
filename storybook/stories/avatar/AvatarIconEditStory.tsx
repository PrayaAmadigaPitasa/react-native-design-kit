import React from 'react';
import AvatarStory, {AvatarStoryProps} from './AvatarStory';
import {Alert} from 'react-native';

export interface AvatarIconEditStoryProps extends AvatarStoryProps {}

export default function AvatarIconEditStory({
  source,
  ...props
}: AvatarIconEditStoryProps) {
  return (
    <AvatarStory
      {...props}
      icon="edit"
      source={
        source || {uri: 'https://pbs.twimg.com/media/DgEJnDkXkAIBqGH.png:large'}
      }
      onPressIcon={() => Alert.alert('icon: edit')}
    />
  );
}
