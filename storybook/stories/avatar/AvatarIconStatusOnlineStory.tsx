import React from 'react';
import AvatarStory, {AvatarStoryProps} from './AvatarStory';
import {Alert} from 'react-native';

export interface AvatarIconStatusOnlineStoryProps extends AvatarStoryProps {}

export default function AvatarIconStatusOnlineStory({
  source,
  ...props
}: AvatarIconStatusOnlineStoryProps) {
  return (
    <AvatarStory
      {...props}
      icon="status-online"
      source={
        source || {uri: 'https://pbs.twimg.com/media/DgEJnDkXkAIBqGH.png:large'}
      }
      onPressIcon={() => Alert.alert('icon: status-online')}
    />
  );
}
