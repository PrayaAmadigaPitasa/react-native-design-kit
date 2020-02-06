import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {
  ChipStory,
  ChipHorizontalStory,
  ChipIconActionDeleteStory,
  ChipNotRoundedStory,
  ChipActionTypeCheckboxStory,
  ChipActionTypeRadioStory,
} from '.';

storiesOf('Chip', module)
  .add('chip', () => <ChipStory />)
  .add('chip horizontal', () => <ChipHorizontalStory />)
  .add('chip not rounded', () => <ChipNotRoundedStory />)
  .add('chip icon action delete', () => <ChipIconActionDeleteStory />)
  .add('chip action type checkbox', () => <ChipActionTypeCheckboxStory />)
  .add('chip action type radio', () => <ChipActionTypeRadioStory />);
