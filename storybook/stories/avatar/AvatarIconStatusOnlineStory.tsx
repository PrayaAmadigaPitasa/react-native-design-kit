import React from 'react';
import AvatarStory, {AvatarStoryProps} from './AvatarStory';

export interface AvatarIconStatusOnlineStoryProps extends AvatarStoryProps {}

export default function AvatarIconStatusOnlineStory({
  ...props
}: AvatarIconStatusOnlineStoryProps) {
  return <AvatarStory {...props} icon="status-online" />;
}
