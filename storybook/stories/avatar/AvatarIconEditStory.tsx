import React from 'react';
import AvatarStory, {AvatarStoryProps} from './AvatarStory';

export interface AvatarIconEditStoryProps extends AvatarStoryProps {}

export default function AvatarIconEditStory({
  ...props
}: AvatarIconEditStoryProps) {
  return <AvatarStory {...props} icon="edit" />;
}
