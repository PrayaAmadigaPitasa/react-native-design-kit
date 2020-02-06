import React from 'react';
import AvatarStory, {AvatarStoryProps} from './AvatarStory';

export interface AvatarIconStatusStandByStoryProps extends AvatarStoryProps {}

export default function AvatarIconStatusStandByStory({
  ...props
}: AvatarIconStatusStandByStoryProps) {
  return <AvatarStory {...props} icon="status-standby" />;
}
