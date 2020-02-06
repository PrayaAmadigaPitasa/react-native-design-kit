import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {ChipStory, ChipHorizontalStory, ChipIconActionDeleteStory} from '.';

storiesOf('Chip', module)
  .add('chip', () => <ChipStory />)
  .add('chip horizontal', () => <ChipHorizontalStory />)
  .add('chip icon action delete', () => <ChipIconActionDeleteStory />);
