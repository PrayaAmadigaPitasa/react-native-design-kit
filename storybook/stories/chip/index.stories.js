import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {ChipStory} from '.';
import ChipHorizontalStory from './ChipHorizontalStory';

storiesOf('Chip', module)
  .add('chip', () => <ChipStory />)
  .add('chip horizontal', () => <ChipHorizontalStory />);
