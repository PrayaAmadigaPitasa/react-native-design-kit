import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {ChipStory, ChipHorizontalStory, ChipIconActionDeleteStory} from '.';
import ChipNotRoundedStory from './ChipNotRoundedStory';

storiesOf('Chip', module)
  .add('chip', () => <ChipStory />)
  .add('chip horizontal', () => <ChipHorizontalStory />)
  .add('chip not rounded', () => <ChipNotRoundedStory />)
  .add('chip icon action delete', () => <ChipIconActionDeleteStory />);
