import React from 'react';
import AvatarStory, {AvatarStoryProps} from './AvatarStory';
import {Alert} from 'react-native';

export interface AvatarIconEditStoryProps extends AvatarStoryProps {}

export default function AvatarIconEditStory({
  icon = 'edit',
  source,
  ...props
}: AvatarIconEditStoryProps) {
  return (
    <AvatarStory
      {...props}
      icon={icon}
      source={
        source || {uri: 'https://pbs.twimg.com/media/DgEJnDkXkAIBqGH.png:large'}
      }
      onPressIcon={() => Alert.alert('Icon: Edit')}
    />
  );
}
