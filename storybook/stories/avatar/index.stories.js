import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {AvatarStory, AvatarIconEditStory} from '.';

storiesOf('Avatar', module)
  .add('avatar', () => <AvatarStory />)
  .add('avatar icon edit', () => <AvatarIconEditStory />);
