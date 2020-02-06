import React from 'react';
import AvatarStory, {AvatarStoryProps} from './AvatarStory';
import {Alert} from 'react-native';

export interface AvatarIconStatusOfflineStoryProps extends AvatarStoryProps {}

export default function AvatarIconStatusOfflineStory({
  source,
  ...props
}: AvatarIconStatusOfflineStoryProps) {
  return (
    <AvatarStory
      {...props}
      icon="status-offline"
      source={
        source || {uri: 'https://pbs.twimg.com/media/DgEJnDkXkAIBqGH.png:large'}
      }
      onPressIcon={() => Alert.alert('Icon: Status Offline')}
    />
  );
}
