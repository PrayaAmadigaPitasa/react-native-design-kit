import React from 'react';
import AvatarStory, {AvatarStoryProps} from './AvatarStory';

export interface AvatarIconStatusOfflineStoryProps extends AvatarStoryProps {}

export default function AvatarIconStatusOfflineStory({
  ...props
}: AvatarIconStatusOfflineStoryProps) {
  return <AvatarStory {...props} icon="status-offline" />;
}
