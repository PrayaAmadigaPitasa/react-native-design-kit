import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {
  AvatarStory,
  AvatarIconEditStory,
  AvatarIconStatusOnlineStory,
  AvatarIconStatusOfflineStory,
  AvatarIconStatusStandByStory,
} from '.';

storiesOf('Avatar', module)
  .add('avatar', () => <AvatarStory />)
  .add('avatar icon edit', () => <AvatarIconEditStory />)
  .add('avatar icon status online', () => <AvatarIconStatusOnlineStory />)
  .add('avatar icon status offline', () => <AvatarIconStatusOfflineStory />)
  .add('avatar icon status standby', () => <AvatarIconStatusStandByStory />);
