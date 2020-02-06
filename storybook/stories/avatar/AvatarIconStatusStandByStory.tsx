import React from 'react';
import AvatarStory, {AvatarStoryProps} from './AvatarStory';
import {Alert} from 'react-native';

export interface AvatarIconStatusStandByStoryProps extends AvatarStoryProps {}

export default function AvatarIconStatusStandByStory({
  source,
  ...props
}: AvatarIconStatusStandByStoryProps) {
  return (
    <AvatarStory
      {...props}
      icon="status-standby"
      source={
        source || {uri: 'https://pbs.twimg.com/media/DgEJnDkXkAIBqGH.png:large'}
      }
      onPressIcon={() => Alert.alert('Icon: Status StandBy')}
    />
  );
}
